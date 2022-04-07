import {React} from 'react';

export default function MomentBadges(props){

    let DisplayBadges = (props) =>{

        let badgeLinks = []

        let rookieCount = 0;
        for(let i = 0; i < props.tags.length; i++){
            if(props.tags[i].title.includes("Rookie")){
                rookieCount++
            }
        }

        console.log(rookieCount);

        if(rookieCount === 3){

            badgeLinks.push("../images/threeStars.gif");
            props.tags.map((tag) => {
            switch(tag.title) {
                case "Top Shot Debut":
                    badgeLinks.push("../images/topShotDebut.gif")
                    break;
                case "Championship Year":
                    badgeLinks.push("../images/championshipYear.gif")
                    break;
                case "Challenge Reward":
                    badgeLinks.push("../images/challengeReward.svg")
                    break;
                }
            })

        } else {



        props.tags.map((tag) => {
            switch(tag.title) {
                case "Top Shot Debut":
                    badgeLinks.push("../images/topShotDebut.gif")
                    break;
                case "Rookie Premiere":
                    badgeLinks.push("../images/rookiePremiere.gif")
                    break;
                case "Rookie Year":
                    badgeLinks.push("../images/rookieYear.gif")
                    break;
                case "Rookie Mint":
                    badgeLinks.push("../images/rookieMint.gif")
                    break;
                case "Championship Year":
                    badgeLinks.push("../images/championshipYear.gif")
                    break;
                case "Challenge Reward":
                    badgeLinks.push("../images/challengeReward.svg")
                    break;
            }
            
        })
    }

        console.log(badgeLinks)

        if(badgeLinks.length > 0){
            return(
                <div>
                {badgeLinks.map((badge) => (
                    <img src={`${badge}`} key={badge} />
                ))}
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
        

    }


    return(
        <div>
           <DisplayBadges tags={props.tags}/>
        </div>
    )

}