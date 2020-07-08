import React, {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
} from 'react'
import { AuthContext } from './auth'
import { db } from '../utils/firebase'

const RecordsContext = createContext()

const RecordsProvider = ({ children }) => {
	const [records, setRecords] = useState([])
	const { currentUser } = useContext(AuthContext)

	const collection = useMemo(() => {
		const col = db.collection('records')

		// 更新イベント監視
		col.where('uid', '==', currentUser.uid).onSnapshot(query => {
			const data = []
			query.forEach(d => data.push({ ...d.data(), docId: d.id }))
			setRecords(data)
		})

		return col
	}, [])

	const add = useCallback(async input => {
		try {
			await collection.add({
				uid: currentUser.uid,
				record_at: new Date(input.record_at),
				weight: input.weight,
				fat: input.fat,
				subcutaneous_fat: input.subcutaneous_fat,
				visceral_fat_level: input.visceral_fat_level,
				bmr: input.bmr,
				bmi: input.bmi,
				muscle_level: input.muscle_level,
				bone_level: input.bone_level,
			})
			console.log(input)
		} catch (e) {
			console.log(e)
		}
	}, [])

	const update = useCallback(
		async ({ docId, weight, fat }) => {
			const updateTo = {
				...records.find(t => t.docId === docId),
				weight,
				fat,
				recordAt: new Date(),
			}
			try {
				await collection.doc(docId).set(updateTo)
			} catch (e) {
				console.log(e)
			}
		},
		[records]
	)

	const remove = useCallback(
		async ({ docId }) => {
			try {
				await collection.doc(docId).delete()
			} catch (e) {
				console.log(e)
			}
		},
		[records]
	)

	return (
		<RecordsContext.Provider value={{ records, add, update, remove }}>
			{children}
		</RecordsContext.Provider>
	)
}

export { RecordsContext, RecordsProvider }
