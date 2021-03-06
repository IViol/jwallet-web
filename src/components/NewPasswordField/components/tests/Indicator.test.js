// @flow

import React from 'react'
import { mount } from 'enzyme'

import { Indicator } from '../Indicator'

describe('Indicator', () => {
  test('is available', () => {
    expect(Indicator).toBeDefined()
  })

  test('renders (with fetching status)', () => {
    const wrapper = mount(<Indicator status='fetching' />)

    expect(wrapper.prop('status')).toBe('fetching')
    expect(wrapper.children()).toHaveLength(1)

    const child = wrapper.children().first()

    expect(child.children().first().hasClass('fetching')).toBe(true)
  })

  test('renders (with some "color" status)', () => {
    const wrapper = mount(<Indicator status='green' />)

    expect(wrapper.prop('status')).toBe('green')
    expect(wrapper.children()).toHaveLength(1)

    const child = wrapper.children().first()

    expect(child.children().first().hasClass('green')).toBe(true)
  })
})
