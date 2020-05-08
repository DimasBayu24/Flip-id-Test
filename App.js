import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import TransactionScreen from './src/TransactionScreen';
import DetailTransactionScreen from './src/DetailTransactionScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      Transaction: TransactionScreen,
      Detail: DetailTransactionScreen,
    },
    {
      initialRouteName: 'Transaction',
    },
  ),
);
