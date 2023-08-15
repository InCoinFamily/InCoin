import './Checkbox.scss';

export default function Checkbox({
  checked,
  onChange,
  extraClass,
  // image, categoryName,
}) {
  const inputId = `checkbox-input-${Math.random().toString(36).slice(2, 9)}`; // Генерация уникального идентификатора
  return (
    <label className={`custom-checkbox ${extraClass}`} htmlFor={inputId}>
      <input type="checkbox" checked={checked} onChange={onChange} id={inputId} />
      <span className="checkbox-icon" />
      {/* {image && <img src={image} alt={categoryName} className="categories__item-image" />}
      {categoryName && <p className="categories__item-name">{categoryName}</p>} */}
    </label>
  );
}
