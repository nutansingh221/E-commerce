import StarIcon from './StarIcon';

function Rating({rating}){
    return(
        <div>
            <div className='flex flex-row'>
                {[...Array(5)].map((_,i)=>(
                    <StarIcon
                    key={i}
                    width={20}
                    height={20}
                    fill={rating>i ? '#ff5501' : '#989898'}
                    />
                ))}
            </div>
        </div>
    )
}

export default Rating;