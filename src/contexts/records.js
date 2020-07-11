import React, {
	createContext,
	useContext,
	useState,
	useEffect,
} from 'react'
import { AuthContext } from './auth'
import { db } from '../utils/firebase'

const RecordsContext = createContext()

const RecordsProvider = ({ children }) => {
	const [records, setRecords] = useState([])
	const { currentUser } = useContext(AuthContext)

	const col = db.collection('records')

	console.log(col)

	useEffect(() => {

		col.where('uid', '==', currentUser.uid).onSnapshot(docs => {
			const data = []
			docs.forEach(doc => data.push({ ...doc.data(), docId: doc.id }))
			setRecords(data)
		})

		console.log('abc')

		return col
	}, [])

	const add = (async input => {
		try {
			await col.add({
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
	})

	// const update = useEffect(
	// 	async ({ docId, weight, fat }) => {
	// 		const updateTo = {
	// 			...records.find(t => t.docId === docId),
	// 			weight,
	// 			fat,
	// 			recordAt: new Date(),
	// 		}
	// 		try {
	// 			await collection.doc(docId).set(updateTo)
	// 		} catch (e) {
	// 			console.log(e)
	// 		}
	// 	},
	// 	[records]
	// )

	const remove = (
		async ({ docId }) => {
			try {
				await col.doc(docId).delete()
			} catch (e) {
				console.log(e)
			}
		}
	)

	return (
		<RecordsContext.Provider value={{
			records,
			add,
			// update,
			remove
		}}>
			{children}
		</RecordsContext.Provider>
	)
}

export { RecordsContext, RecordsProvider }
