import { useRef } from "react"
import { Input } from "../form-elements"
import Modal from "../modal"

export default function AddPaymentModal({ showModal, setShowModal, addNewPayment }) {
  const merchantNameRef = useRef()
  const accountNumberRef = useRef()
  const expirationDateRef = useRef()

  const handleSubmit = () => {
    addNewPayment({
      merchant_name: merchantNameRef.current.value,
      account_number: accountNumberRef.current.value,
      expiration_date: expirationDateRef.current.value
    })
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} title="Add New Payment Method">
      <div className="space-y-4">
        <Input
          id="merchantName"
          type="text"
          label="Merchant Name"
          refEl={merchantNameRef}
        />
        <Input
          id="accountNumber"
          type="text"
          label="Account Number"
          refEl={accountNumberRef}
        />
        <Input
          id="expirationDate"
          type="date"
          label="Expiration Date"
          refEl={expirationDateRef}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button className="button is-success" onClick={handleSubmit}>
          Add Payment Method
        </button>
        <button className="button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </Modal>
  )
}
