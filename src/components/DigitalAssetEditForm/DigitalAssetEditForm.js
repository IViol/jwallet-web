// @flow

import React from 'react'

import { JInput, JRaisedButton } from 'components/base'

type DigitalAssetEditFormProps = {|
  +submit: () => void,
  +setField: SetFieldFunction<EditAssetFormFields>,
  +formFields: EditAssetFormFields,
  +invalidFields: EditAssetFormFields,
  +submitLabel: string,
  +isAddressLoading: boolean,
  +isAddressEditable: boolean,
|}

const DigitalAssetEditForm = ({
  formFields,
  invalidFields,
  setField,
  submit,
  isAddressLoading,
  isAddressEditable,
  submitLabel,
}: DigitalAssetEditFormProps) => {
  const setFieldHandler = (fieldName: $Keys<EditAssetFormFields>) =>
    (value: string) => setField(fieldName, value)

  const fields: Array<{
    key: $Keys<EditAssetFormFields>,
    placeholder: string,
    isDisabled: boolean,
    isLoading: boolean,
  }> = [{
    key: 'address',
    placeholder: 'Address (ERC-20)',
    isDisabled: !isAddressEditable,
    isLoading: isAddressLoading,
  }, {
    key: 'name',
    placeholder: 'Name',
    isDisabled: false,
    isLoading: false,
  }, {
    key: 'symbol',
    placeholder: 'Symbol',
    isDisabled: false,
    isLoading: false,
  }, {
    key: 'decimals',
    placeholder: 'Decimals',
    isDisabled: false,
    isLoading: false,
  }]

  return (
    <div className='digital-asset-edit-form'>
      <div className='form'>
        {fields.map(({ key, placeholder, isDisabled, isLoading }) => (
          <JInput
            key={key}
            onChange={setFieldHandler(key)}
            value={formFields[key]}
            name={`custom-asset-${key}`}
            errorMessage={invalidFields[key]}
            placeholder={placeholder}
            type='text'
            color='gray'
            isDisabled={isDisabled}
            isLoading={isLoading}
          />
        ))}
        <div className='actions'>
          <JRaisedButton
            onClick={submit}
            label={submitLabel}
            color='blue'
            labelColor='white'
            isWide
          />
        </div>
      </div>
    </div>
  )
}

DigitalAssetEditForm.defaultProps = {
  isAddressLoading: false,
  isAddressEditable: true,
  submitLabel: 'Add asset',
}

export default DigitalAssetEditForm