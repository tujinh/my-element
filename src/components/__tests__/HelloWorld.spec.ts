import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Button from '../Button/Button.vue'

describe('Button Component', () => {
  // 测试基本渲染
  it('renders default button correctly', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('.t-button').exists()).toBe(true)
    expect(wrapper.text()).toContain('Button')
  })

  // 测试动态标签
  it('renders as different HTML tags', () => {
    const wrapperA = mount(Button, {
      props: { tag: 'a' }
    })
    expect(wrapperA.element.tagName).toBe('A')

    const wrapperDiv = mount(Button, {
      props: { tag: 'div' }
    })
    expect(wrapperDiv.element.tagName).toBe('DIV')
  })

  // 测试 type 类名
  it('applies type classes', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info'] as const
    types.forEach(type => {
      const wrapper = mount(Button, {
        props: { type }
      })
      expect(wrapper.classes()).toContain(`t-button-${type}`)
    })
  })

  // 测试 size 类名
  it('applies size classes', () => {
    const sizes = ['large', 'default', 'small'] as const
    sizes.forEach(size => {
      const wrapper = mount(Button, {
        props: { size }
      })
      expect(wrapper.classes()).toContain(`t-button-${size}`)
    })
  })

  // 测试状态类名
  it('applies state classes', () => {
    const wrapperPlain = mount(Button, {
      props: { plain: true }
    })
    expect(wrapperPlain.classes()).toContain('is-plain')

    const wrapperRound = mount(Button, {
      props: { round: true }
    })
    expect(wrapperRound.classes()).toContain('is-round')

    const wrapperCircle = mount(Button, {
      props: { circle: true }
    })
    expect(wrapperCircle.classes()).toContain('is-circle')
  })

  // 测试插槽内容
  // describe('Slots', () => {
  //   it('renders default slot', () => {
  //     const wrapper = mount(Button, {
  //       slots: {
  //         default: 'Custom Button'
  //       }
  //     })
  //     expect(wrapper.text()).toContain('Custom Button')
  //   })

  //   it('renders loading slot', () => {
  //     const wrapper = mount(Button, {
  //       slots: {
  //         loading: '<div class="loading-indicator">Loading...</div>'
  //       }
  //     })
  //     expect(wrapper.find('.loading-indicator').exists()).toBe(true)
  //   })

  //   it('renders icon slot', () => {
  //     const wrapper = mount(Button, {
  //       slots: {
  //         icon: '<i class="icon-user"></i>'
  //       }
  //     })
  //     expect(wrapper.find('.icon-user').exists()).toBe(true)
  //   })
  // })

  // 测试组合情况
  it('combines multiple classes correctly', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        size: 'large',
        round: true
      }
    })

    const classes = wrapper.classes()
    expect(classes).toContain('t-button')
    expect(classes).toContain('t-button-primary')
    expect(classes).toContain('t-button-large')
    expect(classes).toContain('is-round')
  })
})
