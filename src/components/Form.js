import React, { useContext, useState, useCallback } from 'react'
import styled from 'styled-components'
// import { TextField, Button } from '@material-ui/core'
import { AuthContext } from '../contexts/auth'
import { RecordsContext } from '../contexts/records'
import { ModalContext } from '../contexts/modal'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    position: relative;
    width: 50%;
    &[data-unit]::after{
      content: attr(data-unit) " ";
      position: absolute;
      top: 50%;
      right: 1em;
      transform: translateY(-50%);
      display: inline-block;
      height: 1em;
    }
    & > *{
      width: 100%;
      height: 3em;
      margin-top: 1vh;
      font-size: 1.25em;
      text-align: center;
    }
    & input{
      position: relative;
      &[type="date"]{
        &::-webkit-calendar-picker-indicator{
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        &::-webkit-inner-spin-button{
          -webkit-appearance: none;
        }
        &::-webkit-clear-button{
          -webkit-appearance: none;
        }
      }
    }
  }
`

const initInput = {
  record_at: new Date(),
  weight: 0,
  fat: 0,
  subcutaneous_fat: 0,
  visceral_fat_level: 0,
  bmr: 0,
  bmi: 0,
  muscle_level: 0,
  bone_level: 0,
}

export default () => {
  const { signout } = useContext(AuthContext)
  const { add } = useContext(RecordsContext)
  const { close } = useContext(ModalContext)

  const [input, setInput] = useState(initInput)

  const addRecord =
    (e) => {
      e.preventDefault()
      add(input)
      close()
      setInput(initInput)
    }

  const updateField = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Form>
      <div>
        <input
          name="record_at"
          placeholder="record_at"
          value={input.record_at}
          type="date"
          onChange={updateField}
        />
      </div>
      <div data-unit="kg">
        <input
          name="weight"
          placeholder="weight"
          value={input.weight}
          type="number"
          step="0.1"
          onChange={updateField}
        />
      </div>
      <div data-unit="%">
        <input
          name="fat"
          placeholder="fat"
          value={input.fat}
          type="number"
          step="0.1"
          onChange={updateField}
        />
      </div>
      <div data-unit="%">
        <input
          name="subcutaneous_fat"
          placeholder="subcutaneous_fat"
          value={input.subcutaneous_fat}
          type="number"
          step="0.1"
          onChange={updateField}
        />
      </div>
      <div>
        <input
          name="visceral_fat_level"
          placeholder="visceral_fat_level"
          value={input.visceral_fat_level}
          type="number"
          step="1"
          onChange={updateField}
        />
      </div>
      <div data-unit="kcal">
        <input
          name="bmr"
          placeholder="bmr"
          value={input.bmr}
          type="number"
          step="1"
          onChange={updateField}
        />
      </div>
      <div>
        <input
          name="bmi"
          placeholder="bmi"
          value={input.bmi}
          type="number"
          step="0.1"
          onChange={updateField}
        />
      </div>
      <div>
        <input
          name="muscle_level"
          placeholder="muscle_level"
          value={input.muscle_level}
          type="number"
          step="1"
          onChange={updateField}
        />
      </div>
      <div>
        <input
          name="bone_level"
          placeholder="bone_level"
          value={input.bone_level}
          type="number"
          step="1"
          onChange={updateField}
        />
      </div>
      <div>
        <button color="primary" onClick={addRecord}>
          Add
        </button>
      </div>
      <div>
        <button color="default" onClick={signout}>
          Sign Out
        </button>
      </div>
    </Form>
  )
}
