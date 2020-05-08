import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import TransactionScreen from './src/TransactionScreen';
import DetailTransactionScreen from './src/DetailTransactionScreen';

// *Note to reviewer
//App.js used only for navigation between Transaction screen and detail screen.
// most of all codes are placed in src folder

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
