// @flow strict

import React, { PureComponent } from 'react'
import { i18n } from 'i18n/lingui'
import { Trans } from '@lingui/react'
import { connect } from 'react-redux'

import { StartLayout } from 'layouts'

import {
  JLink,
  JIcon,
  JCheckbox,
  Button,
} from 'components/base'

import {
  selectAgreementsConditions,
} from 'store/selectors/user'

import {
  setAgreementIsConfirmed,
  setAllAgreementsAreConfirmed,
} from 'store/modules/user'

import { CONDITIONS_LIST } from 'data/agreements'

import agreementsViewStyle from './agreementsView.m.scss'

export type Props = {|
  setAgreementIsConfirmed: Function,
  setAllAgreementsAreConfirmed: Function,
  agreements: {
    [agreement: string]: boolean,
  },
|}

/* eslint-disable max-len */
const conditions = {
  understandPrivateDataPolicy: i18n._(
    'TermsAndConditions.understandPrivateDataPolicy',
    null,
    { defaults: 'I understand that my funds are stored securely on my personal computer. No private data is sent to Jibrel AG servers. All encryption is done locally in browser' },
  ),
  consentNoWarranty: i18n._(
    'TermsAndConditions.consentNoWarranty',
    null,
    { defaults: 'I consent that Jwallet service is provided as is without warranty. Jibrel AG does not have access to my private information and could not participate in resolution of issues concerning money loss of any kind' },
  ),
  consentTrackingCookies: i18n._(
    'TermsAndConditions.consentTrackingCookies',
    null,
    { defaults: 'I consent to allow cookies for collecting anonymous usage data to improve quality of provided service' },
  ),
  // acceptTermsAndConditions: t('TermsAndConditions.acceptTermsAndConditions', 'I have read and accepted'),
}
/* eslint-enable max-len */

class AgreementsScreen extends PureComponent<Props> {
  onChange = (key: string) => (isChecked: boolean) => {
    this.props.setAgreementIsConfirmed(key, isChecked)
  }

  handleAgreementsConfirmClick = () => {
    this.props.setAllAgreementsAreConfirmed(true)
  }

  componentDidMount = () => {
    this.props.setAllAgreementsAreConfirmed(false)
  }

  render() {
    const { agreements } = this.props

    const isAllAgreementsChecked = CONDITIONS_LIST.every(key => agreements[key])

    return (
      <StartLayout className='__agreements-view'>
        <div className={agreementsViewStyle.content}>
          <JIcon
            name='terms-and-conditions-use-fill'
            className={agreementsViewStyle.icon}
            color='blue'
          />
          <h1 className={agreementsViewStyle.title}>
            {i18n._(
              'TermsAndConditions.title',
              null,
              { defaults: 'Terms and Conditions' },
            )}
          </h1>
          <div>
            {CONDITIONS_LIST.map((key: string) => (
              <div className={agreementsViewStyle.item} key={key}>
                {key !== 'acceptTermsAndConditions' ? (
                  <JCheckbox
                    onChange={this.onChange(key)}
                    label={conditions[key]}
                    name={key}
                    isChecked={agreements[key]}
                    isRegular
                  >
                    {conditions[key]}
                  </JCheckbox>
                ) : (
                  <JCheckbox
                    onChange={this.onChange(key)}
                    color='black'
                    name={key}
                    isChecked={agreements[key]}
                    isRegular
                  >
                    <Trans id='TermsAndConditions.acceptTermsAndConditions'>
                      {/* eslint-disable-next-line max-len */}
                      I have read and accepted <JLink theme='text-white' href='https://jwallet.network/docs/JibrelAG-TermsofUse.pdf'>Terms of Use</JLink> and <JLink theme='text-white' href='https://jwallet.network/docs/JibrelAG-PrivacyPolicy.pdf'>Privacy Policy</JLink>
                    </Trans>
                  </JCheckbox>
                )}
              </div>
            ))}
          </div>
          <div className={agreementsViewStyle.action}>
            <JLink href='/wallets'>
              <Button
                className={agreementsViewStyle.button}
                theme='general'
                isDisabled={!isAllAgreementsChecked}
                onClick={this.handleAgreementsConfirmClick}
              >
                {i18n._(
                  'TermsAndConditions.button',
                  null,
                  { defaults: 'Confirm and continue' },
                )}
              </Button>
            </JLink>
          </div>
        </div>
      </StartLayout>
    )
  }
}

function mapStateToProps(state: AppState) {
  const agreements = selectAgreementsConditions(state)

  return {
    agreements,
  }
}

const mapDispatchToProps = {
  setAgreementIsConfirmed,
  setAllAgreementsAreConfirmed,
}

export const AgreementsView = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(AgreementsScreen)
