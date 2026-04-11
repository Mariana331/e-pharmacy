'use client';

import css from './FilterMedicine.module.css';
import Select from 'react-select';
import { useState } from 'react';

interface FilterMedicineProps {
  value: string;
  category: string;
  onSubmitSearch: (value: string) => void;
  onSubmitCategory: (value: string) => void;
  placeholder?: string;
}

export default function FilterMedicine({
  value,
  category,
  onSubmitSearch,
  onSubmitCategory,
  placeholder = 'Search medicine',
}: FilterMedicineProps) {
  const [query, setQuery] = useState(value ?? '');

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitSearch(query.trim() ?? '');
  };

  const handleClear = () => {
    setQuery('');
    onSubmitSearch('');
    onSubmitCategory('');
  };

  const categoryOptions = [
    { value: 'Hand', label: 'Hand' },
    { value: 'Head', label: 'Head' },
    { value: 'Medicine', label: 'Medicine' },
    { value: 'Leg', label: 'Leg' },
    { value: 'Dental Care', label: 'Dental Care' },
    { value: 'Heart', label: 'Heart' },
  ];
  return (
    <div className={css.filter}>
      <div className={css.form_category}>
        <Select
          unstyled
          placeholder="Product category"
          value={
            category
              ? categoryOptions.find((opt) => opt.value === category)
              : null
          }
          options={categoryOptions}
          onChange={(option) => onSubmitCategory(option?.value ?? '')}
          classNames={{
            control: () => css.control_category,
            valueContainer: () => css.valueContainer,
            singleValue: () => css.singleValue,
            indicatorsContainer: () => css.indicators,
            option: (state) =>
              state.isSelected ? css.optionSelected : css.option,
            menu: () => css.menu,
            placeholder: () => css.placeholder,
          }}
        />
      </div>

      <form className={css.search_form} onSubmit={handleSubmit}>
        <input
          className={css.input_form}
          placeholder={placeholder}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={css.box_icon}>
          <button
            className={css.form_btn_search}
            type="submit"
            aria-label="Search"
          >
            <svg width={16} height={16} className={css.icon_search}>
              <use href="/sprite.svg#icon-search"></use>
            </svg>
          </button>
        </div>
      </form>

      <div className={css.btn_wrapper}>
        <button className={css.btn_filter} type="button" onClick={handleClear}>
          <svg className={css.icon_filter} width={14} height={14}>
            <use href="/sprite.svg#icon-filter"></use>
          </svg>
          Filter
        </button>
      </div>
    </div>
  );
}
