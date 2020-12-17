import Buefy from 'buefy'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import AddBlockMenu from '@/components/AddBlockMenu.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('AddBlockMenu', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(AddBlockMenu, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('has 2 links', () => {
    const wrapper = shallowMount(AddBlockMenu, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links.length).toBe(2)
  })
})
