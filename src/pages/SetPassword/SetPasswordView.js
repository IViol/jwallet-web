// @flow strict

import React, { Component } from 'react'
import { t } from 'ttag'
import { noop } from 'lodash-es'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { NewPasswordField } from 'components'

import {
  JInputField,
  Button,
} from 'components/base'
import { StartLayout } from 'layouts'

import setPasswordViewStyle from './setPasswordView.m.scss'

export type Props = {|
  +dispatch: Function,
  +validate: FormValidate,
  +submit: (FormFields, Function) => Promise<void>,
|}

type StateProps = {|
  +isStrongPassword: boolean,
|}

const PASSWORD_FORM_INITIAL_VALUES = {
  password: '',
  passwordHint: '',
  passwordConfirm: '',
}

export class SetPasswordView extends Component<Props, StateProps> {
  static defaultProps = {
    dispatch: noop,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isStrongPassword: false,
    }
  }

  handleScoreChange = (isStrongPassword: boolean) => {
    this.setState({ isStrongPassword })
  }

  handleSubmit = async (values: FormFields): Promise<void> => {
    const {
      submit,
      dispatch,
    }: Props = this.props

    await submit(values, dispatch)
  }

  renderSetPasswordForm = ({
    handleSubmit,
    form: {
      change: handleChange,
    },
    values = {},
    submitting: isSubmitting,
  }: FormRenderProps) => (
    <form
      onSubmit={handleSubmit}
      className={setPasswordViewStyle.form}
    >
      <NewPasswordField
        onChange={handleChange}
        onScoreChange={this.handleScoreChange}
        values={values}
        label={t`Enter Security Password`}
        isDisabled={isSubmitting}
        isAutoFocus
      />
      <Field
        component={JInputField}
        name='passwordHint'
        label={t`Enter Password Hint`}
        infoMessage={t`If you forget your Security Password,
some functions won’t be available. To restore access to all functions
you will need to clear your data and re-import your wallets again using backup phrase.`}
      />
      <Button
        type='submit'
        isLoading={isSubmitting}
        isDisabled={!this.state.isStrongPassword}
      >
        {t`Set Security Password`}
      </Button>
    </form>
  )

  render() {
    return (
      <StartLayout
        className='__new-password'
      >
        <h1 className={setPasswordViewStyle.title}>
          {t`Set Password to Secure Your Storage`}
        </h1>
        <Form
          onSubmit={this.handleSubmit}
          validate={this.props.validate}
          render={this.renderSetPasswordForm}
          initialValues={PASSWORD_FORM_INITIAL_VALUES}
        />
      </StartLayout>
    )
  }
}
