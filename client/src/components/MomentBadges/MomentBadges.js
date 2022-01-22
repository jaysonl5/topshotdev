import {React, useState, useEffect} from 'react';

export default function MomentBadges(props){

    let [badge, setBadge] = useState([])
    let [count, setCount] = useState(0);

    let tags = [
        {
            id: "a75e247a-ecbf-45a6-b1be-58bb07a1b651",
            title:"Top Shot Debut",
            visible: true
        },
        {
            id:"0ddb2c58-4385-443b-9c70-239b32cddbd4",
            title: "Rookie Premiere",
            visible:true
        }
    ]

    function handleBadges(tags){

        tags.map((tag) => {
            switch(tag.title) {
                case "Top Shot Debut":
                    console.log("TS DEBUT!")
                    setBadge("../../images/topShotDebut.gif")
                case "Rookie Premiere":
                    console.log("ROOKIE")
                    setBadge("../../images/rookiePremiere.gif")
            }
            
        })

    }

    useEffect(() => {
        handleBadges(tags);     
    }, [1]);

    

    return(
        <div>
            <h1>Badges!</h1>
            {badge.length < 1 ? badge.map((badge) => {
                <div>
                    <img src={badge} />
                </div>
            }) : "Loading..."}
        </div>
    )

}