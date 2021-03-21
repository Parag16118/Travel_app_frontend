import React from 'react'

const Renderpath = (props) => {

    const {list} = props

    

    return (
        <div class="container">
            <h4>Your Travel Plan</h4>
            {list.map((item) => {

                let hh=parseInt(item.duration/60);
                let mm=item.duration-60*hh;
                return (

                    <li key={item.id}>
                        {item.start} to {item.end} from {item.transport} having cost:{item.price} EUR for duration: {hh} hrs {(mm==0)?"":<span>{mm} min</span>}
                    </li>
                    
                );
            })}
        </div>
    )
}

export default Renderpath
