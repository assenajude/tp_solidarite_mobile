import client from '../api/http-common'


const postData = (data) => {
    const dataKeys = Object.keys(data)
    let formData = new FormData();

   dataKeys.forEach(key => {
       if(key === 'images') {
           data.images.forEach(image => {
               formData.append('images', {
                   name: image.split('/').pop(),
                   type: 'image/jpeg',
                   uri: image
               })
           })
       } else {
       formData.append(key, data[key])
       }
   })

    client.post('/services', formData).then(response => {
        console.log('success...', response.data)
    }).catch(error => {
        console.log('error...', error)
    })
}

export {
    postData
}