import React, { useContext } from 'react'
// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   Button,
//   Checkbox,
//   Divider,
// } from '@material-ui/core'
import styled from 'styled-components'
import { RecordsContext } from '../contexts/records'

const Contents = styled.div`
  & {
    flex: 1;
    border-top: 1px solid #ddd;
    margin-top: 10px;
    padding: 10px;
  }
`

const EmptyMessage = styled.div`
  & {
    font-size: 18px;
    color: #aaa;
    padding: 10px;
  }
`

const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];


export default () => {
  const { records, remove } = useContext(RecordsContext)
  // const { records, update, remove } = useContext(RecordsContext)

  return (
    < Contents >
      {
        records.length === 0 ? (
          <EmptyMessage>No records...</EmptyMessage>
        ) : (
            <table>
              <thead>
                <tr>
                  <th>記録日</th>
                  <th>体重</th>
                  <th>体脂肪率</th>
                  <th>皮下脂肪率</th>
                  <th>内臓脂肪レベル</th>
                  <th>基礎代謝</th>
                  <th>BMI</th>
                  <th>筋肉レベル</th>
                  <th>骨レベル</th>
                </tr>
              </thead>
              <tbody>
                {records.map(record => (
                  <tr key={record.docId}>
                    <td>
                      {`${('00' + (record.record_at.toDate().getMonth() + 1)).slice(-2)}/${('00' + record.record_at.toDate().getDate()).slice(-2)}(${dayOfWeek[record.record_at.toDate().getDay()]})`}</td>
                    <td>{record.weight}<small>kg</small></td>
                    <td>{record.fat}<small>%</small></td>
                    <td>{record.subcutaneous_fat}<small>%</small></td>
                    <td>{record.visceral_fat_level}<small></small></td>
                    <td>{record.bmr}<small>kcal</small></td>
                    <td>{record.bmi}<small></small></td>
                    <td>{record.muscle_level}<small></small></td>
                    <td>{record.bone_level}<small></small></td>
                    <td>
                      <button
                        color="default"
                        onClick={() => {
                          remove({ docId: record.docId })
                        }}
                      >
                        Delete
                  </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
      }
    </Contents >
  )
}
