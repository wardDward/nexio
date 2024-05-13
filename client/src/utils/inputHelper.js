export const handleInputChanges = (e, formData, setFormData) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
