import { Button } from './Button'

export default {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
}

export const Success = {
  args: {
    primary: true,
    label: 'Button',
    backgroundColor: 'green',
  },
}

export const Danger = {
  args: {
    primary: true,
    label: 'Button',
    backgroundColor: 'red',
  },
}
