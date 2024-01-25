import { View,Text } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDimensionContext } from "../../../context";
import Colors from "../../../components/common/Colors";
import style from "./style";
import Accordion from 'react-native-collapsible/Accordion';
import { useState } from "react";

const Extrainfo=props=>{
const dimensions=useDimensionContext();
const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait);
const DetailsArray=[
    {
        title:'Manufacture Details',
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

    },
    {
        title:'Product Disclaimer',
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

    },
    {
        title:'Features & Details',
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

    },

]
const [curActiveSections, setActiveSections] = useState([0]);
const _renderHeader=sections=>{
    return(
        <View style={responsivestyle.headview}>
            <Text style={responsivestyle.deschead}>{sections.title}</Text>
            <AntDesign name="down" size={15} color={Colors.Gray} />
        </View>
    );
}
const _renderContent=sections=>{
    return(
        <View>
            <Text style={responsivestyle.description}>
                {sections.content}
            </Text>
        </View>
    );
}
const _updateSections=activeSections=>{
    setActiveSections(activeSections);
}
return(
    <>
    <Accordion
    activeSections={curActiveSections}
    sections={DetailsArray}
    renderHeader={_renderHeader}
    renderContent={_renderContent}
    onChange={_updateSections}
    underlayColor={'transparent'}
    sectionContainerStyle={responsivestyle.sectionstyle}
  />
  </>
  );
}
export default Extrainfo;
