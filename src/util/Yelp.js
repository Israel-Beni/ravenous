const apiKey = 'd63bbESUMV8GvTzYeTXvg5LoFkATfAVU18QNlZQmod7oCOMNzg9cr_Twu6jOXjYwqfvG2IhRzgpOlJ1CvPc0BrfnZ9SVxTZuBcPUGzPNikpoVlkCuvIxWesPS8KxYXYx';

const Yelp = {
    search(term, location, sortBy) {
        const endpoint = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&locaiton=&{location}&sort_by=${sortBy}`;
        const authentication = {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        };
        return fetch(endpoint, authentication)
                    .then(response => {
                        return response.json();
                    }).then (jsonResponse => {
                        if (jsonResponse.businesses) {
                            return jsonResponse.businesses.map( business => {
                                return {
                                    id: business.id,
                                    imageSrc: business.imageUrl,
                                    name: business.name,
                                    address: business.location.address1,
                                    city: business.location.city,
                                    state: business.location.state,
                                    zipCode: business.location.zip_code,
                                    category: business.categories.title,
                                    rating: business.rating,
                                    reviewCount: business.review_count
                                }
                            });
                        }
                    });
    }
};

export default Yelp;