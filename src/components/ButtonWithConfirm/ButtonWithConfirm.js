// @flow strict

import React, { Component } from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { Button } from 'components/base'

import buttonWithConfirmStyle from './buttonWithConfirm.m.scss'

type Props = {|
  +onCancel: () => void,
  +onConfirm: () => void,
  +labelCancel: string,
  +labelConfirm: string,
  +confirmTimeout: number,
  +isReversed: boolean,
  +i18n: I18nType,
|}

type StateProps = {|
  +countdown: number,
  +intervalId: ?IntervalID,
|}

const ONE_SECOND: 1000 = 1000

class ButtonWithConfirmComponent extends Component<Props, StateProps> {
  static defaultProps = {
    confirmTimeout: 0,
    isReversed: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      intervalId: null,
      countdown: props.confirmTimeout,
    }
  }

  componentDidMount() {
    this.startCountdown()
  }

  componentWillUnmount() {
    this.finishCountdown()
  }

  setIntervalId = (intervalId: ?IntervalID) => {
    this.setState({ intervalId })
  }

  setCountdown = (countdown: number) => {
    if (countdown < 0) {
      this.finishCountdown()
    } else {
      this.setState({ countdown })
    }
  }

  startCountdown = () => {
    const intervalId: IntervalID = setInterval(() => {
      this.setCountdown(this.state.countdown - 1)
    }, ONE_SECOND)

    this.setIntervalId(intervalId)
  }

  finishCountdown = () => {
    const { intervalId } = this.state

    if (intervalId) {
      clearInterval(intervalId)
      this.setIntervalId(null)
    }
  }

  resetCountdown = () => {
    const {
      onCancel,
      confirmTimeout,
    }: Props = this.props

    this.finishCountdown()
    this.setCountdown(confirmTimeout)
    onCancel()
  }

  handleCancel = () => {
    this.resetCountdown()
  }

  render() {
    const {
      i18n,
      isReversed,
      labelCancel,
      labelConfirm,
      onConfirm: handleConfirm,
    }: Props = this.props

    const { countdown }: StateProps = this.state
    const isConfirmDisabled: boolean = (countdown > 0)

    return (
      <div
        className={classNames(
          buttonWithConfirmStyle.core,
          isReversed && buttonWithConfirmStyle.reversed,
        )}
      >
        <Button
          onClick={this.handleCancel}
          className={buttonWithConfirmStyle.cancel}
          theme={isReversed ? 'general' : 'secondary'}
        >
          {labelCancel}
        </Button>
        <Button
          onClick={handleConfirm}
          className={buttonWithConfirmStyle.confirm}
          theme={isReversed ? 'secondary' : 'general'}
          isDisabled={isConfirmDisabled}
        >
          {isConfirmDisabled
            ? i18n._(
              'common.ButtonWithConfirm.countdown',
              { countdown },
              { defaults: '{countdown} sec' },
            )
            : labelConfirm}
        </Button>
      </div>
    )
  }
}

export const ButtonWithConfirm = withI18n()(ButtonWithConfirmComponent)
