import { useEffect, useState } from 'react'
import { getCategories, getProductCategories } from '../../data/products'
import CardLayout from '../card-layout'
import { Textarea, Select, Input } from '../form-elements'

export default function ProductForm({ formEl, saveEvent, title, router }) {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategorySelect = (value) => {
    setSelectedCategory(value)
  }
  useEffect(() => {
    getProductCategories().then(catData => setCategories(catData))
  }, [])

  return (
    <CardLayout title={title}>
      <form ref={formEl}>
        <Input
          id="name"
          label="Name"
        />
        <Textarea
          id="description"
          label="Description"
        />
        {/* <Select
          id="category"
          options={categories}
          label="Category"
          title="Select a Category"
        /> */}
        <Select
          id="category"
          options={categories}
          label="Category"
          title="Select a Category"
          onCategorySelect={handleCategorySelect}
        />


        <Input
          id="price"
          label="Price"
        />
        <Input
          id="location"
          label="Location"
        />
        <Input
          id="quantity"
          label="Quantity"
          type="number"
        />
      </form>
      <>
        <a className="card-footer-item" onClick={saveEvent}>Save</a>
        <a className="card-footer-item" onClick={() => router.back()}>Cancel</a>
      </>
    </CardLayout>
  )
}


