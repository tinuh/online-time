import React from 'react';
import '../styles/style.css';

//rsuite

//Material UI Theme
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import {red, blue, green, purple} from '@material-ui/core/colors';


function Excercises(props) {

    return (
      <div className = "excercises">
        <div style={{ position: 'relative', width: '100%', height: 500 }}>
            <AutoRotatingCarousel
                label='Exit'
                caption = "test"
                open={props.open}
                onClose={props.stop}
                onStart={props.stop}
                style={{ position: 'absolute' }}
                interval = {30000}
            >
                <Slide
                    media={<img src='https://www.printerland.co.uk/PrinterlandImages/Image/info/Infographics/1%20-%20Desk%20Dips.gif' width = "100%" height = "100%" alt = "Desk Dips"/>}
                    mediaBackgroundStyle={{ backgroundColor: red[400] }}
                    style={{ backgroundColor: red[600] }}
                    title='Desk Dips'
                    subtitle='Bend at the elbow and lower yourself towards the floor until your elbows are bent at 90 degrees, aim to hold the pose for 30 seconds.'
                />
                <Slide
                    media={<img src='https://www.printerland.co.uk/PrinterlandImages/Image/info/Infographics/4%20-%20Calf%20Raises.gif' width = "100%" height = "100%" alt = "Calf Raises" />}
                    mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                    style={{ backgroundColor: blue[600] }}
                    title='Calf Raises'
                    subtitle='Using a sturdy object for support, stand on your tip toes and hold the pose for 15 seconds to strengthen the backs of your legs.'
                />
                <Slide
                    media={<img src='https://www.printerland.co.uk/PrinterlandImages/Image/info/Infographics/8%20-%20Leg%20Raises.gif' width = "100%" height = "100%" alt = "Leg Raises" />}
                    mediaBackgroundStyle={{ backgroundColor: green[400] }}
                    style={{ backgroundColor: green[600] }}
                    title='Leg Raises'
                    subtitle='Under your desk, simply raise both legs at once upwards, and slowly lower them down. Repeat this action over multiple times.'
                />
                <Slide
                    media={<img src='https://www.printerland.co.uk/PrinterlandImages/Image/info/Infographics/11%20-%20Knee%20Lifts.gif' width = "100%" height = "100%" alt = "Knee Lifts" />}
                    mediaBackgroundStyle={{ backgroundColor: purple[400] }}
                    style={{ backgroundColor: purple[600] }}
                    title='Knee Lifts'
                    subtitle='Standing on the spot, lift your leg up in front of you, bringing both arms down on either side at the same time. Repeat this action on the other leg.'
                />
                <Slide
                    media={<img src='https://www.printerland.co.uk/PrinterlandImages/Image/info/Infographics/16%20-%20Seated%20Arm%20Circles.gif' width = "100%" height = "100%" alt = "Seated Arm Cirlces" />}
                    mediaBackgroundStyle={{ backgroundColor: red[400] }}
                    style={{ backgroundColor: red[600] }}
                    title='Seated Arm Circles'
                    subtitle='With your palms facing down, circle your arms forwards around 20 times. Then, face your palms upwards and circle your arms backwards around 20 times.'
                />
                <Slide
                    media={<img src='https://www.printerland.co.uk/PrinterlandImages/Image/info/Infographics/3%20-%20Chest%20Stretch.gif' width = "100%" height = "100%" alt = "Chest Stretch" />}
                    mediaBackgroundStyle={{ backgroundColor: green[400] }}
                    style={{ backgroundColor: green[600] }}
                    title='Chest Stretch'
                    subtitle='Stand up and hold your hands together behind your back, expanding your chest and hold the pose for 30 seconds.'
                />
            </AutoRotatingCarousel>
        </div>
      </div>
  );
}

export default Excercises;