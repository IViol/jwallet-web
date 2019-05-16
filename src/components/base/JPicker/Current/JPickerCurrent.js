// @flow

import React from 'react'
import classNames from 'classnames'
import { camelCase } from 'lodash-es'

import pickerCurrentStyle from './jPickerCurrent.m.scss'

type Props = {
  +value: string,
  +inputValue: ?string,
  +label: string,
  +isEditable: boolean,
  +hasError: boolean,
  +onClick: ?(() => any),
  +onInputChange: ?((e: SyntheticInputEvent<HTMLInputElement>) => any),
  +iconRenderer: ?(() => React$Node),
  +balancesRenderer: ?(() => React$Node),
}

function JPickerCurrent({
  value,
  inputValue,
  label,
  isEditable,
  hasError,
  onClick,
  onInputChange,
  iconRenderer,
  balancesRenderer,
}: Props) {
  const hasValue = !!value
  const id = camelCase(`${label}currentId`)

  return (
    <div
      className={classNames(
        pickerCurrentStyle.core,
        hasError && pickerCurrentStyle.error,
        isEditable && pickerCurrentStyle.editble,
        hasValue && pickerCurrentStyle.value,
        iconRenderer && pickerCurrentStyle.hasIcon,
      )}
      onClick={onClick}
    >
      <input
        id={id}
        type='text'
        className={pickerCurrentStyle.input}
        placeholder={value}
        value={inputValue}
        disabled={!isEditable}
        onChange={onInputChange}
      />
      <label className={pickerCurrentStyle.label} htmlFor={id}>
        {label}
      </label>
      {iconRenderer && (
        <div className={pickerCurrentStyle.icon}>
          {iconRenderer()}
        </div>
      )}
      {balancesRenderer && (
        <div className={pickerCurrentStyle.balances}>
          {balancesRenderer()}
        </div>
      )}
    </div>
  )
}

JPickerCurrent.defaultProps = {
  value: '',
  lebel: '',
  isEditable: true,
  editable: false,
  hasError: false,
  onClick: null,
  inputValue: undefined,
  onInputChange: null,
  iconRenderer: null,
  balancesRenderer: null,
}

export { JPickerCurrent }
