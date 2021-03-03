import React, {useRef} from 'react';
import {View, ScrollView} from "react-native";
import AppInputImage from "./AppInputImage";

function AppImageListPicker({imagesUrls= [], deleteImage, addNewImage}) {
    const scrollView = useRef()
    
    return (
        <View>
            <ScrollView  ref={scrollView} horizontal onContentSizeChange={() => scrollView.current.scrollToEnd()}>
                   <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center"}}>
                    {imagesUrls.map((url, index) => <View key={index.toString()} style={{margin: 10}}>
                        <AppInputImage  imageUrl={url} changeImage={() => deleteImage(url)}
                        />
                        </View>
                        )}
                <AppInputImage  changeImage={(url) => addNewImage(url)}/>
                   </View>
            </ScrollView>
        </View>
    );
}

export default AppImageListPicker;