import sqlite3
import requests

# Fetches data from the API
def populate_products():
    try:
        URL = r"https://fakestoreapi.com/products"

        response = requests.get(URL)
        response.raise_for_status()
        data = response.json()
        print("Data fetched successfully.")

        try:
            conn = sqlite3.connect("store_db")
            cur = conn.cursor()
            # cur.execute("create table Products(ID integer primary key, Title text, Price real, Category text, Rating real, Image text)")
            for record in data:
                cur.execute(f'''insert into Products values (?,?,?,?,?,?)''',(record['id'], record['title'], record['price'], record['category'], record['rating']['rate'], record['image']))
                # cur.execute(f'''update Products set Image = {record['image']} where ID = {record['id']}''')
            conn.commit()
            cur.close()
            conn.close()
            print("Data added successfully.")
        except sqlite3.Error as e:
            print(f"Error occured in populating Products Table: {e}")

    except requests.exceptions.RequestException as e:
        print(f"Error in fetching data: {e}") 

# Display the available products
def display_data(table_name):
    try:
        conn = sqlite3.connect("store_db")
        cur = conn.cursor()

        cur.execute(f'''select * from {table_name}''')
        rows = cur.fetchall()
        col_names = [description[0] for description in cur.description]
        # Converting the rows into dictonary
        data = [dict(zip(col_names, row)) for row in rows]

        # print(tabulate(rows, headers=col_names, tablefmt='pretty'))
        cur.close()
        conn.close()
        total = 0
        for row in rows:
            total += row[4]
        return [data, total]
    except sqlite3.Error as e:
        print(f"Error accessing Database: {e}")

# Create cart table
def create_cart():
    try:
        conn = sqlite3.connect("store_db")
        cur = conn.cursor()
        cur.execute("create table Cart(ID integer primary key, Title text, Price real, Quantity integer, Amount real, Image text, foreign key(ID) references Products(ID))")
        cur.close()
        conn.close()
    except sqlite3.Error as e:
        print(f"Error accessing Database: {e}")

# Adding products to Cart
def add_to_cart(prodId:int, qty:int):
    try:
        conn = sqlite3.connect("store_db")
        cur = conn.cursor()
        cur2 = conn.cursor()
        cur.execute("select ID from Cart")
        presentProd = cur.fetchall()
        presentProdId = [row[0] for row in presentProd]
        if prodId in presentProdId: #If product already exists in the cart then update the quantity and amount
            cur.execute(f'select Quantity, Price from Cart where ID = {prodId}')
            old = cur.fetchall()
            newQty = old[0][0] + qty
            newAmt = old[0][1] * newQty
            cur2.execute(f'''update Cart
                         set Quantity = {newQty}, Amount = {newAmt}
                         where ID = {prodId}
                         ''')
        else: #If the product is new add it to the cart
            cur.execute(f'''select Title, Price, Image
                        from Products
                        where ID = {prodId}
                        ''')
            details = cur.fetchall()
            cur2.execute(f'''insert into Cart values(?,?,?,?,?,?)''',(prodId, details[0][0], details[0][1], qty, qty*details[0][1], details[0][2]))
        conn.commit()
        cur.close()
        cur2.close()
        conn.close()
    except sqlite3.Error as e:
        print(f"Error Database: {e}")

# Remove product from Cart
def delete_from_cart(prodId:int, qty=None):
    try:
        conn = sqlite3.connect('store_db')
        cur = conn.cursor()
        cur.execute(f'''select Price, Quantity from Cart where ID = {prodId}''')
        old = cur.fetchone()
        # Raise exception if product is not in cart
        if old == None: raise sqlite3.Error("Product not in Cart.")
        # To delete the product from cart
        if qty == None or qty == 0:
            cur.execute(f'''delete from Cart where ID = {prodId}''')
            conn.commit()
            print("Item Removed.")
            display_data('Cart')
        # To reduce the quantity of a product in the cart
        elif qty > 0 and qty <= old[1]:
            newAmt = old[0] * qty
            cur.execute(f'''update Cart
                            set Quantity = {qty}, Amount = {newAmt}
                            where ID = {prodId}
                        ''')
            conn.commit()
            print("Quantity Updated.")
            display_data('Cart')
        else:
            raise sqlite3.Error(f"Quantity should be less than {old[1]}")
        cur.close()
        conn.close()
    except sqlite3.Error as e:
        print(f"Error : {e}")

# populate_products()
# display_data('Products')
# create_cart()
# add_to_cart(2,3)
# delete_from_cart(3)
# delete_from_cart(5,4)
# display_data('Cart')