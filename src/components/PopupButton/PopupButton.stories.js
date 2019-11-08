// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'

import JText from 'components/base/JText'
import PopupButton from 'components/PopupButton'

storiesOf('PopupButton', module)
  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <div className='inline align-right'>
        <PopupButton
          icon='filter'
        >
          <JText
            size='normal'
            color='gray'
            value='Some content'
          />
        </PopupButton>
      </div>
    </div>
  ))
  .add('With counter', () => (
    <div className='story'>
      <h2>With counter</h2>
      <div className='inline align-right'>
        <PopupButton
          icon='filter-selected'
          counter={2}
        >
          <JText
            size='normal'
            color='gray'
            value='Some content'
          />
        </PopupButton>
      </div>
    </div>
  ))
