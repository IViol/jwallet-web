// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { getTxFee, getTxLink, getAddressLink } from 'utils/transactions'

import { JText, JFlatButton } from 'components/base'
import TransactionItemDetailsComment from './Comment'

type Props = {|
  +repeat: () => void,
  +addFavorite: () => void,
  +data: TransactionWithAssetAddress,
  +networkId: NetworkId,
  +assetDecimals: number,
  +isActive: boolean,
|}

type StateProps = {|
  isCommenting: boolean,
|}

class TransactionItemDetails extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isCommenting: false,
    }
  }

  toggle = () => this.setState({ isCommenting: !this.state.isCommenting })

  render() {
    const {
      repeat,
      addFavorite,
      networkId,
      assetDecimals,
      isActive,
    } = this.props

    const {
      isCommenting,
    }: StateProps = this.state

    const {
      receiptData,
      data,
      hash,
      from,
      to,
    }: TransactionWithAssetAddress = this.props.data

    return (
      <div className={classNames('transaction-item-details', isActive && '-active')}>
        <div className='item'>
          <div className='label'>
            <JText value='TX Hash' color='gray' />
          </div>
          <div className='value'>
            <a
              href={getTxLink(hash, networkId)}
              target='_blank'
              className='link'
              rel='noopener noreferrer'
            >
              <JText value={hash} color='blue' weight='bold' />
            </a>
          </div>
        </div>
        <div className='item -small-width'>
          <div className='label'>
            <JText value='From address' color='gray' />
          </div>
          <div className='value'>
            <a
              href={getAddressLink(hash, from, networkId)}
              target='_blank'
              className='link'
              rel='noopener noreferrer'
            >
              <JText value={from} color='blue' weight='bold' />
            </a>
          </div>
        </div>
        <div className='item -small-width'>
          <div className='label'>
            <JText value='To address' color='gray' />
          </div>
          <div className='value'>
            <a
              href={getAddressLink(hash, to, networkId)}
              target='_blank'
              className='link'
              rel='noopener noreferrer'
            >
              <JText value={to} color='blue' weight='bold' />
            </a>
          </div>
        </div>
        <div className='item'>
          <div className='label'>
            <JText value='Fee' color='gray' />
          </div>
          <div className='value'>
            <JText
              value={`${getTxFee(receiptData.gasUsed, data.gasPrice, assetDecimals)} ETH`}
              color='gray'
              weight='bold'
            />
          </div>
        </div>
        <div className='actions'>
          <div className='action'>
            <JFlatButton
              onClick={repeat}
              iconSize='medium'
              label='Repeat payment'
              iconColor='gray'
              color='gray'
              iconName='repeat'
            />
          </div>
          <div className='action'>
            <JFlatButton
              onClick={addFavorite}
              iconSize='medium'
              label='Add to favourites'
              iconColor='gray'
              color='gray'
              iconName='star-add'
            />
          </div>
          <div className='action'>
            <JFlatButton
              onClick={this.toggle}
              iconSize='medium'
              label='Add comment'
              iconColor='gray'
              color='gray'
              iconName='message-add'
            />
          </div>
        </div>
        {isCommenting && (
          <TransactionItemDetailsComment
            saveComment={this.toggle}
            deleteComment={this.toggle}
          />
        )}
      </div>
    )
  }
}

export default TransactionItemDetails
