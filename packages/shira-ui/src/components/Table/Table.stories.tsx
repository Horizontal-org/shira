import { StoryObj, Meta } from '@storybook/react';
import { Table } from './Table'
import { makeData, Person } from './components/FakeData'
import { useMemo, useState } from 'react';
import { TableCheckbox } from './components/TableCheckbox';
import { ColumnDef } from '@tanstack/react-table';
import styled from 'styled-components';
import { Body3, Body3Bold } from '../Typography';
import { TableActions } from './components/TableActions';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '1024px' }}>
            <Story />
        </div>
      </div>
    ),
  ]
} as Meta<typeof Table>;

type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: {},
  render: function Render(args) {
  const [data, setData] = useState(() => makeData(1000))
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <TableCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
              isTDCheckbox: false
            }}
          />
        ),
        cell: ({ row }) => (
          <TableCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
              isTDCheckbox: true
            }}
          />          
        ),
      },
      {
        header: 'Learner',        
        id: 'learner',
        cell: ({ row }) => {
          return (
            <LearnerPersonInfo>
              <LearnerName>{row.original.name}</LearnerName>
              <LearnerEmail>{row.original.email}</LearnerEmail>
            </LearnerPersonInfo>
          )
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: info => info.getValue()        
      },
      {
        header: 'Date invited',
        accessorKey: 'dateInvited',
        accessorFn: (r) => r.dateInvited && r.dateInvited.toTimeString(),
        cell: info => info.getValue()        
      },
      {
        id: 'actions',
        cell: ({row}) => {
          return (
            <TableActions 
              onDelete={() => { console.log('ON DELETE => ', row)}}
              onResend={() => { console.log('ON RESEND => ', row)}}
            />
          )
        }
      }
    ],
    []
  )
    return (
      <Table 
        loading={false}
        data={data}
        columns={columns}
        colGroups={(
          <colgroup>
            <col style={{ width: "50px" }} />
            <col style={{ width: "50%" }} />
            <col />
            <col />
            <col style={{ width: "80px" }} />
          </colgroup>
        )}
      />
    )
  }
};



const LearnerPersonInfo = styled.div`
  color: ${props => props.theme.colors.dark.darkGrey};
`

const LearnerName = styled(Body3Bold)`
  margin: 0;
  font-weight: 700;
`

const LearnerEmail = styled(Body3)`
  font-size: 14px;
`