const apiKey = 'd63bbESUMV8GvTzYeTXvg5LoFkATfAVU18QNlZQmod7oCOMNzg9cr_Twu6jOXjYwqfvG2IhRzgpOlJ1CvPc0BrfnZ9SVxTZuBcPUGzPNikpoVlkCuvIxWesPS8KxYXYx';
const clientId = 'lx8TYRuT1khynvqwMBaLWw';

const Yelp = {
    search(term, location, sortBy) {
        const endpoint = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        const authentication = {
            method: 'GET',
            headers: {
                "accept": "application/json",
                "x-requested-with": "xmlhttprequest",
                "Access-Control-Allow-Origin":"http://localhost:3000/",
                "Authorization": `Bearer ${apiKey}`
            }
        };
        return fetch(endpoint, authentication)
                    .then(response => {
                        const jsonResponse = response.json();
                        console.log('response: ', jsonResponse);
                        return jsonResponse;
                    }).then(jsonResponse => {
                        if (jsonResponse.businesses) {
                            console.log('jsonResponse:', jsonResponse)
                            return jsonResponse.businesses.map( business => ({
                                id: business.id,
                                imageSrc: business.image_url,
                                url: business.url,
                                name: business.name,
                                address: business.location.address1,
                                city: business.location.city,
                                state: business.location.state,
                                zipCode: business.location.zip_code,
                                category: business.categories[0].title,
                                rating: business.rating,
                                reviewCount: business.review_count
                            }));
                        }
                    });
    }
};

export default Yelp;