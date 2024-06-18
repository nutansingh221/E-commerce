from flask import Flask, request, jsonify
from flask_cors import CORS
import Database

app = Flask(__name__)
CORS(app)

@app.route('/getProducts', methods=['GET'])
def getProducts():
    try:
        data = Database.display_data('products')
        response = jsonify(data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/getCart', methods=['GET'])
def getCart():
    try:
        data = Database.display_data('Cart')
        response = jsonify(data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/addToCart', methods=['POST'])
def addToCart():
    try:
        # Extracting the item id from the request data
        item_id = request.json.get('id')
        if not item_id:
            return jsonify({'error': 'No item id provided'}), 400
        
        # Assuming `quantity` is also passed in the request data
        quantity = request.json.get('quantity', 1)  # Default quantity to 1 if not provided
        
        data = Database.add_to_cart(item_id, quantity)
        response = jsonify(data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/deleteFromCart', methods=['POST'])
def deleteFromCart():
    try:
        # Extracting the item id from the request data
        item_id = request.json.get('id')
        if not item_id:
            return jsonify({'error': 'No item id provided'}), 400
        
        # Assuming `quantity` is also passed in the request data
        quantity = request.json.get('quantity')  # Default quantity to 1 if not provided
        
        data = Database.delete_from_cart(item_id, quantity)
        response = jsonify(data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    print("Starting python Flask Server for e-commerse website.")
    app.run(port=5000, debug=True)