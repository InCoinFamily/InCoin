import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './TransactionCard.scss';
import {
  addTransaction,
  deleteTransaction,
  fetchTransactionList,
} from '../../../store/slices/transactionListSlice';
import EditTransactionPopup from '../../EditTransactionPopup/EditTransactionPopup';
import ConfirmationPopup from '../../ConfirmationPopup/ConfirmationPopup';
import usePopup from '../../../utils/hooks/usePopup';

export default function TransactionCard({ transaction }) {
  const dispatch = useDispatch();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const {
    isOpen: isEditTransactionPopupOpen,
    openPopup: openEditTransactionPopup,
    closePopup: closeEditTransactionPopup,
  } = usePopup('editTransaction');

  const {
    isOpen: isConfirmationPopupOpen,
    openPopup: openConfirmationPopup,
    closePopup: closeConfirmationPopup,
  } = usePopup('confirmation');

  if (!transaction) {
    return null;
  }

  const { name, finance, amount, category } = transaction;

  const categoryTypeStyles = {
    1: { mathSign: '-', amountStyle: 'card__amount_spending', text: 'расход' },
    2: { mathSign: '+', amountStyle: 'card__amount_earn', text: 'доход' },
  };

  const { mathSign, amountStyle, text } =
    categoryTypeStyles[transaction.category_type] || categoryTypeStyles[2];

  const handleDeleteTransactionClick = (evt) => {
    evt.preventDefault();
    setSelectedTransaction(transaction);
    openConfirmationPopup();
  };

  const handleDelete = () => {
    dispatch(deleteTransaction(selectedTransaction.id)).then(() => {
      dispatch(fetchTransactionList());
    });
    setSelectedTransaction(null);
  };

  const handleEdit = () => {
    setSelectedTransaction(transaction);
    openEditTransactionPopup();
  };

  const handleEditTransactionPopupClose = () => {
    setSelectedTransaction(null);
    closeEditTransactionPopup();
  };

  const handleRepeatTransaction = () => {
    const newTransactionData = {
      created: transaction.created,
      category: transaction.category.id,
      name: transaction.name,
      amount: transaction.amount,
      finance: transaction.finance.id,
      category_type: transaction.category_type,
    };

    dispatch(addTransaction(newTransactionData)).then(() => {
      dispatch(fetchTransactionList());
    });
  };

  const handleConfirmationTransactionPopupClose = () => {
    setSelectedTransaction(null);
    closeConfirmationPopup();
  };

  return (
    <li className="card">
      <div className="card__block">
        <img className="card__category" src={category.image} alt={category.name} />
        <p className="card__header">
          {category.name}
          <span className="card__text">{name}</span>
        </p>
      </div>

      <div className="card__block">
        <img className="card__bank-img" src={finance.image} alt={finance.name} />
        <p className="card__text">{finance.name}</p>
      </div>

      <div className="card__block">
        <p className={`card__amount ${amountStyle}`}>
          {mathSign}
          {amount} ₽
        </p>
      </div>

      <div className="card__block card__button-block">
        <button
          type="button"
          aria-label="Изменить"
          className="card__button card__button_edit"
          onClick={handleEdit}
        />
        <button
          type="button"
          aria-label="Удалить"
          className="card__button card__button_delete"
          onClick={handleDeleteTransactionClick}
        />
        <button
          type="button"
          aria-label="Повторить"
          className="card__button card__button_copy"
          onClick={handleRepeatTransaction}
        />
      </div>

      {isEditTransactionPopupOpen && (
        <EditTransactionPopup
          onClose={handleEditTransactionPopupClose}
          transaction={selectedTransaction}
          categoryType={transaction.category_type}
        />
      )}
      {isConfirmationPopupOpen && selectedTransaction && (
        <ConfirmationPopup
          onClose={handleConfirmationTransactionPopupClose}
          onSubmit={handleDelete}
          confirmationText={`Вы действительно хотите удалить ${text} «${selectedTransaction.name}» ?`}
          buttonText={text}
        />
      )}
    </li>
  );
}
