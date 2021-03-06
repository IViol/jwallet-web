// @flow strict

import React, { Component } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { NewPasswordField } from 'components'

import {
  Button,
  JInputField,
} from 'components/base'

import styles from './newPasswordForm.m.scss'

export type Props = {|
  +onSubmit: (FormFields) => Promise<?FormFields>,
  +i18n: I18nType,
|}

type StateProps = {|
  +isStrongPassword: boolean,
|}

const PASSWORD_FORM_INITIAL_VALUES: FormFields = {
  passwordNew: '',
  passwordHint: '',
  passwordConfirm: '',
}

class NewPasswordForm extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isStrongPassword: false,
    }
  }

  validate = ({
    passwordNew,
    passwordHint,
    passwordConfirm,
  }: FormFields): ?FormFields => {
    const { i18n }: Props = this.props

    if (passwordNew !== passwordConfirm) {
      return {
        passwordConfirm: i18n._(
          'SetPassword.errors.passwordsNotMatch',
          null,
          { defaults: 'Password does not match confirmation' },
        ),
      }
    }

    if (!passwordHint) {
      return {
        passwordHint: i18n._(
          'SetPassword.errors.hintRequired',
          null,
          { defaults: 'Password hint is required' },
        ),
      }
    }

    if (passwordNew === passwordHint) {
      return {
        passwordHint: i18n._(
          'SetPassword.errors.hintEqualsPassword',
          null,
          { defaults: 'Password and hint should not be equal' },
        ),
      }
    }

    return null
  }

  handleScoreChange = (isStrongPassword: boolean) => {
    this.setState({ isStrongPassword })
  }

  handleSubmit = async (values: FormFields): ?FormFields => {
    const errors: ?FormFields = this.validate(values)

    if (errors) {
      return errors
    }

    return this.props.onSubmit(values)
  }

  renderSetPasswordForm = ({
    handleSubmit,
    form: {
      change: handleChange,
    },
    values = {},
    submitting: isSubmitting,
  }: FormRenderProps) => {
    const { i18n }: Props = this.props

    const {
      passwordNew,
      passwordHint,
      passwordConfirm,
    }: FormFields = values

    const hasAllValues: boolean = !(!passwordNew || !passwordHint || !passwordConfirm)

    return (
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <NewPasswordField
          onChange={handleChange}
          onScoreChange={this.handleScoreChange}
          values={values}
          label={i18n._(
            'components.NewPasswordForm.label.password',
            null,
            { defaults: 'Enter Security Password' },
          )}
          isDisabled={isSubmitting}
          isAutoFocus
        />
        <Field
          component={JInputField}
          name='passwordHint'
          label={i18n._(
            'components.NewPasswordForm.label.hint',
            null,
            { defaults: 'Enter Password Hint' },
          )}
          infoMessage={i18n._(
            'components.NewPasswordForm.description',
            null,
            // eslint-disable-next-line max-len
            { defaults: 'If you forget your Security Password, some functions won’t be available. To restore access to all functions you will need to clear your data and re-import your wallets again using backup phrase.' },
          )}
          maxLength={256}
        />
        <Button
          type='submit'
          isLoading={isSubmitting}
          isDisabled={!(this.state.isStrongPassword && hasAllValues)}
        >
          {i18n._(
            'components.NewPasswordForm.button',
            null,
            { defaults: 'Set Security Password' },
          )}
        </Button>
      </form>
    )
  }

  render() {
    const { i18n }: Props = this.props

    return (
      <div className={styles.core}>
        <h1 className={styles.title}>
          {i18n._(
            'components.NewPasswordForm.title',
            null,
            { defaults: 'Set Password to Secure Your Storage' },
          )}
        </h1>
        <Form
          onSubmit={this.handleSubmit}
          render={this.renderSetPasswordForm}
          initialValues={PASSWORD_FORM_INITIAL_VALUES}
        />
      </div>
    )
  }
}

const NewPasswordFormEnhanced = withI18n()(NewPasswordForm)
export { NewPasswordFormEnhanced as NewPasswordForm }
