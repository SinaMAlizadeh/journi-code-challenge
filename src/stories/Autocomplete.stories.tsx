import type { Meta, StoryObj } from '@storybook/react';

import Autocomplete from '@/components/autoComplete/autoComplete';

// Default export with metadata about the component
const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: { control: undefined },
    title: { control: 'text' },
    setSearch: { action: 'setSearch' },
    setSelected: { action: 'setSelected' },
    loading: { control: 'boolean' },
    noResultsMessage: { control: 'text' },
  },
  args: { setSearch: () => null, setSelected: () => null },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories with different args
export const Default: Story = {
  args: {
    data: [
      { name: 'United States' },
      { name: 'Canada' },
      { name: 'United Kingdom' },
      { name: 'Australia' },
    ],
    title: 'name',
    loading: false,
    noResultsMessage: 'No results found.',
  },
};

export const Loading: Story = {
  args: {
    data: [],
    title: 'name',
    loading: true,
    noResultsMessage: 'No results found.',
  },
};

export const NoResults: Story = {
  args: {
    data: [],
    title: 'name',
    loading: false,
    noResultsMessage: 'No results found.',
  },
};
