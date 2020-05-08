import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class DetailTransactionScreen extends Component {
  id = this.props.navigation.getParam('id', '');
  amount = this.props.navigation.getParam('amount', '');
  unique_code = this.props.navigation.getParam('unique_code', '');
  sender_bank = this.props.navigation.getParam('sender_bank', '');
  account_number = this.props.navigation.getParam('account_number', '');
  beneficiary_name = this.props.navigation.getParam('beneficiary_name', '');
  beneficiary_bank = this.props.navigation.getParam('beneficiary_bank', '');
  remark = this.props.navigation.getParam('remark', '');
  created_at = this.props.navigation.getParam('created_at', '');

  render() {
    return (
      <View style={style.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#AE2503"
          translucent={true}
        />
        <ScrollView style={style.filling}>
          <View
            style={style.transactionId}
            onPress={() => this.props.navigation.navigate('Transaction')}>
            <Text style={style.fontWeight}>ID TRANSAKSI: #{this.id}</Text>
            <TouchableOpacity style={style.copyIcon}>
              <Icon name="content-copy" size={25} color="#FD6442" />
            </TouchableOpacity>
          </View>
          <View style={style.detailTitle}>
            <Text style={style.fontWeight}>DETAIL TRANSAKSI</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Transaction')}>
              <Text style={style.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
          <Text style={style.headerWrap}>
            {this.sender_bank} ➔ {this.beneficiary_bank}
          </Text>
          <View style={style.wrapDetail}>
            <View style={style.detailLeft}>
              <Text style={style.fontWeight}>-{this.beneficiary_name}</Text>
              <Text>{this.account_number}</Text>
            </View>
            <View style={style.detailRight}>
              <Text style={style.fontWeight}>NOMINAL</Text>
              <Text>Rp.{this.amount}</Text>
            </View>
            <View style={style.detailLeft}>
              <Text style={style.fontWeight}>BERITA TRANSFER</Text>
              <Text>{this.remark}</Text>
            </View>
            <View style={style.detailRight}>
              <Text style={style.fontWeight}>KODE UNIK</Text>
              <Text>{this.unique_code}</Text>
            </View>
            <View style={style.detailLeft}>
              <Text style={style.fontWeight}>WAKTU DIBUAT</Text>
              <Text>{this.created_at}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  filling: {
    width: '100%',
    paddingTop: '5%',
    backgroundColor: '#F8F9FB',
  },
  transactionId: {
    paddingHorizontal: '3%',
    marginTop: '5%',
    backgroundColor: '#FFFFFF',
    paddingVertical: '4%',
    width: '100%',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyIcon: {
    marginLeft: '2%',
  },
  detailTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: '4%',
    borderBottomWidth: 0.5,
    backgroundColor: '#FFFFFF',
  },
  closeText: {
    color: '#FD6442',
  },
  headerWrap: {
    paddingVertical: '4%',
    paddingHorizontal: '3%',
    backgroundColor: '#FFFFFF',
  },
  wrapDetail: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '4%',
    paddingHorizontal: '3%',
    backgroundColor: '#FFFFFF',
  },
  detailLeft: {
    width: '65%',
    paddingBottom: '6%',
  },

  detailRight: {
    width: '35%',
    paddingBottom: '6%',
  },
  fontWeight: {
    fontWeight: 'bold',
  },
});
