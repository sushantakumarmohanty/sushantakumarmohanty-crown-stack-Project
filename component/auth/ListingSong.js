import React, { Component } from 'react'
import styles from '../../style';
import { Container, Content } from 'native-base';
import crownnNum from '../../assets/images/crownnNum.png';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { callAPI } from '../../config/Utility'
import Modal from "react-native-modal";

export class ListingSong extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productsData: [],
            showMickelJaksonSongDetails: false,

        }
    }
    async componentDidMount() {
        this.getProductData();
    }

    showMickelJaksonSongDetails = (showModelItems) => {
        this.setState({
            showMickelJaksonSongDetails: !this.state.showMickelJaksonSongDetails,
            showModelItems
        })
    }

    getProductData = () => {
        const url = "https://itunes.apple.com/search?term=Michael+jackson"
        axios.get(url).
            then(response => response.data)
            .then((data) => {
                this.setState({
                    productsData: data.results
                })
            })
    }

    _reviews = (rowItem) => {
        const { item, index } = rowItem;
        return (
            <TouchableOpacity onPress={() => this.showMickelJaksonSongDetails(item)} >
                <View style={{ flexDirection: 'row', paddingBottom: 20, marginTop: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#000' }} key={index} >
                    <Image source={{ uri: item.artworkUrl60 }} style={styles.image_image_path} />
                    <View style={{ marginLeft: 20, flexDirection: 'column', flex: 1, backgroundColor: '#F2F2F2', padding: 16, borderRadius: 10 }}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: '#4AB3F4', fontFamily: 'WorkSans-Regular', fontSize: 12 }}>{item.collectionArtistName}</Text>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: '#4AB3F4', fontFamily: 'WorkSans-Regular', fontSize: 12 }}>{item.collectionName}</Text>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: '#4AB3F4', fontFamily: 'WorkSans-Regular', fontSize: 12 }}>{item.country}</Text>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: '#4AB3F4', fontFamily: 'WorkSans-Regular', fontSize: 12 }}>{item.artistName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    _detailsProvider = () => {
        if (this.state.showModelItems) {
            console.log("ID Console List:::", this.state.showModelItems)
            return (
                <View style={{ flexDirection: 'column', paddingBottom: 16, alignItems: 'center',justifyContent:'center',flex:1 }} >
                    <Text style={{ color: '#000' ,fontFamily: 'WorkSans-Regular', fontSize: 12}}>{this.state.showModelItems && this.state.showModelItems.collectionName ? this.state.showModelItems.collectionName : ''}</Text>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: '#4AB3F4', fontFamily: 'WorkSans-Regular', fontSize: 12 }}>{this.state.showModelItems && this.state.showModelItems.artistName ? this.state.showModelItems.artistName :"" }</Text>
                </View>
            )
        } else {
            return (<View />)
        }
    }
    render() {
        console.log("MICKEL_JAKSON", this.state.productsData)
        return (
            <Container>
                <Content ref={c => this._content = c}>
                    <View style={styles.login_wrapper}>
                        <View style={[styles.login_imageView,{marginBottom:8}]}>
                            <Image source={crownnNum} style={styles.login_image_path} />
                                <Text style={{ fontSize: 18, color: '#000',fontFamily:'WorkSans-SemiBold' }}>Crown Stack </Text>
                        </View>
                        <View style={{ marginHorizontal: 16 }}>
                            <FlatList data={this.state.productsData}
                                horizontal={false}
                                extraData={this.state}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this._reviews}>
                            </FlatList>
                        </View>
                        <Modal visible={this.state.showMickelJaksonSongDetails} transparent={true}
                            onRequestClose={() => this.showMickelJaksonSongDetails()}
                            onBackdropPress={() => this.showMickelJaksonSongDetails()} style={{ backgroundColor: 'rgba(0,0,0,0.6)', margin: 0 }} >
                            <View style={{ width: '90%', marginLeft: "5%", overflow: 'scroll', alignItems: 'center', borderRadius: 5, padding: 20, elevation: 99, height: 'auto', maxHeight: '100%', borderWidth: 1, borderColor: '#4AB3F4', backgroundColor: '#fff' }}>
                                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                                    {this._detailsProvider()}
                                </ScrollView>
                            </View>
                        </Modal>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default ListingSong
