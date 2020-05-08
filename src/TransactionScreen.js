import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Axios from 'axios';

export default class TransactionScreen extends Component {
  state = {
    modalVisible: false,
    transaction: [],
    filterText: 'URUTKAN ▽',
    searchKey: '',
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  handleSearch = search => {
    const searchFiltered = this.state.transaction.filter(
      item => item.beneficiary_name === search,
    );
    console.log('search ', search);

    this.setState({transaction: searchFiltered});
  };

  handleReset = () => {
    Axios.get('https://nextar.flip.id/frontend-test').then(result => {
      const transactionList = result.data;
      const output = Object.keys(transactionList).map(function(key) {
        return transactionList[key];
      });
      this.setState({
        transaction: output,
        modalVisible: false,
        filterText: 'URUTKAN ▽',
      });
    });
  };

  handleSortAZ = () => {
    const sortAZ = []
      .concat(this.state.transaction)
      .sort((a, b) => (a.beneficiary_name > b.beneficiary_name ? 1 : -1));
    this.setState({
      transaction: sortAZ,
      modalVisible: false,
      filterText: 'Nama A-Z ▽',
    });
  };

  handleSortZA = () => {
    const sortZA = []
      .concat(this.state.transaction)
      .sort((a, b) => (a.beneficiary_name < b.beneficiary_name ? 1 : -1));
    this.setState({
      transaction: sortZA,
      modalVisible: false,
      filterText: 'Nama Z-A ▽',
    });
  };

  handleSortDateA = () => {
    const sortDateA = []
      .concat(this.state.transaction)
      .sort((a, b) => (a.completed_at > b.completed_at ? 1 : -1));
    this.setState({
      transaction: sortDateA,
      modalVisible: false,
      filterText: 'Paling Baru ▽',
    });
  };

  handleSortDateZ = () => {
    const sortDateZ = []
      .concat(this.state.transaction)
      .sort((a, b) => (a.completed_at < b.completed_at ? 1 : -1));
    this.setState({
      transaction: sortDateZ,
      modalVisible: false,
      filterText: 'Paling Lama▽',
    });
  };

  componentDidMount() {
    Axios.get('https://nextar.flip.id/frontend-test').then(result => {
      const transactionList = result.data;
      const output = Object.keys(transactionList).map(function(key) {
        return transactionList[key];
      });
      this.setState({transaction: output, viewSource: output});
    });
  }

  render() {
    const filteredData = this.state.transaction.filter(item => {
      return (
        item.beneficiary_name.toLowerCase().indexOf(this.state.searchKey) >=
          0 ||
        item.beneficiary_bank.toLowerCase().indexOf(this.state.searchKey) >=
          0 ||
        item.sender_bank.toLowerCase().indexOf(this.state.searchKey) >= 0 ||
        item.amount.toString().indexOf(this.state.searchKey) >= 0
      );
    });

    return (
      <View
        style={[style.container, this.state.modalVisible ? style.modalOn : '']}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#AE2503"
          translucent={true}
        />
        <View
          style={[
            style.headerSearch,
            this.state.modalVisible ? style.modalOn : '',
          ]}>
          <TextInput
            onChangeText={value =>
              this.setState({searchKey: value.toLowerCase()})
            }
            style={[
              style.searchInput,
              this.state.modalVisible ? style.modalOn : '',
            ]}
            height={40}
            fontSize={15}
            placeholder="⌕ Cari nama, bank, atau nominal"
          />
          <TouchableOpacity
            style={[
              style.headerTextContainer,
              this.state.modalVisible ? style.modalOn : '',
            ]}>
            <Text
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={style.headerText}>
              {this.state.filterText}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={[style.filling, this.state.modalVisible ? style.modalOn : '']}>
          <View style={style.scrollViewStyle}>
            {filteredData.map(item => (
              <TouchableOpacity
                style={[
                  style.position,
                  this.state.modalVisible ? {opacity: 0.5} : '',
                  item.status === 'SUCCESS' ? '' : {backgroundColor: '#FD6442'},
                ]}
                onPress={() =>
                  this.props.navigation.navigate('Detail', {
                    id: item.id,
                    amount: item.amount,
                    unique_code: item.unique_code,
                    sender_bank: item.sender_bank,
                    account_number: item.account_number,
                    beneficiary_name: item.beneficiary_name,
                    beneficiary_bank: item.beneficiary_bank,
                    remark: item.remark,
                    created_at: item.created_at,
                  })
                }>
                <View
                  style={[
                    style.cardTransaction,
                    this.state.modalVisible ? style.modalOn : '',
                  ]}>
                  <View>
                    <Text style={style.fontWeight}>
                      {item.sender_bank} ➔ {item.beneficiary_bank}
                    </Text>
                    <Text>{item.beneficiary_name}</Text>
                    <Text>
                      Rp.{item.amount} • {item.completed_at}
                    </Text>
                  </View>
                  <View>
                    {item.status === 'SUCCESS' ? (
                      <Text
                        style={[
                          style.statusSuccess,
                          this.state.modalVisible ? {opacity: 0.5} : '',
                        ]}>
                        Berhasil
                      </Text>
                    ) : (
                      <Text
                        style={[
                          style.statusPending,
                          this.state.modalVisible ? style.modalOn : '',
                        ]}>
                        Pengecekan
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="slide">
          <TouchableOpacity
            onPressOut={() => {
              this.setModalVisible(false);
            }}>
            <TouchableWithoutFeedback>
              <View style={style.modal}>
                <TouchableOpacity
                  onPress={this.handleReset}
                  style={style.modalButton}>
                  <Text>URUTKAN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.handleSortAZ}
                  style={style.modalButton}>
                  <Text>Nama A-Z</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.handleSortZA}
                  style={style.modalButton}>
                  <Text>Nama Z-A</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.handleSortDateA}
                  style={style.modalButton}>
                  <Text>Tanggal Terbaru</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.handleSortDateZ}
                  style={style.modalButton}>
                  <Text>Tanggal Terlama</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  filling: {
    width: '100%',
    backgroundColor: '#F8F9FB',
  },
  position: {
    backgroundColor: '#50B787',
    marginVertical: '3%',
    width: '98%',
    marginHorizontal: '1%',
    borderRadius: 10,
  },
  headerSearch: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    marginLeft: 5,
    width: '75%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerText: {
    color: '#FD6442',
    paddingVertical: '2%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: 5,
  },
  headerTextContainer: {
    height: 40,
    backgroundColor: '#FFFFFF',
  },

  cardTransaction: {
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    backgroundColor: '#FFFFFF',
    marginLeft: '2%',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  modal: {
    backgroundColor: 'white',
    elevation: 2,
    marginVertical: '50%',
    marginHorizontal: '5%',
    borderRadius: 5,
  },
  modalButton: {
    paddingHorizontal: '10%',
    paddingVertical: '7%',
  },
  statusSuccess: {
    backgroundColor: '#50B787',
    padding: '1%',
    borderRadius: 5,
    color: '#FFFFFF',
  },
  statusPending: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FD6442',
    padding: '1%',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalOn: {
    backgroundColor: 'grey',
  },
  fontWeight: {
    fontWeight: 'bold',
  },
});
