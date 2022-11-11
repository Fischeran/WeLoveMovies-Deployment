# WeLoveMovies-API

[WeLoveMovies](https://starter-movie-front-end-beige.vercel.app/) API is used for finding movies near you. It uses REST principals in design and responds to different HTTP Requests.

## Get all movies

![home page](WeLoveMovies-screenshots/HomePage.png)

This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.

There are two different cases to consider:

- `GET /movies`
- `GET /movies?is_showing=true`

### GET /movies

Create a route that responds to the following request:

```
GET /movies
```

The response from the server should look like the following:

```json
{
  "data": [
    {
      "id": 1,
      "title": "Spirited Away",
      "runtime_in_minutes": 125,
      "rating": "PG",
      "description": "Chihiro ...",
      "image_url": "https://imdb-api.com/..."
    }
    // ...
  ]
}
```

## Get all theaters

This route will return a list of all theaters. Different query parameters will allow for additional information to be included in the data that is returned.

There is one case to consider:

- `GET /theaters`

### GET /theaters


This route returns all the `theaters` and, the movies playing at each theatre added to the `movies` key. This means you will need to check the `movies_theaters` table.

The response from the server should look like the following.

```json
{
  "data": [
    {
      "theater_id": 1,
      "name": "Regal City Center",
      "address_line_1": "801 C St.",
      "address_line_2": "",
      "city": "Vancouver",
      "state": "WA",
      "zip": "98660",
      "created_at": "2021-02-23T20:48:13.335Z",
      "updated_at": "2021-02-23T20:48:13.335Z",
      "movies": [
        {
          "movie_id": 1,
          "title": "Spirited Away",
          "runtime_in_minutes": 125,
          "rating": "PG",
          "description": "Chihiro...",
          "image_url": "https://imdb-api.com...",
          "created_at": "2021-02-23T20:48:13.342Z",
          "updated_at": "2021-02-23T20:48:13.342Z",
          "is_showing": false,
          "theater_id": 1
        }
        // ...
      ]
    }
    // ...
  ]
}

## Read one movie

This route will return a single movie by ID.

There are four different cases to consider:

- `GET /movies/:movieId`
- `GET /movies/:movieId` (incorrect ID)
- `GET /movies/:movieId/theaters`
- `GET /movies/:movieId/reviews`

### GET /movies/:movieId

Create a route that responds to the following request:

```
GET /movies/:movieId
```

The response from the server should look like the following.

```json
{
  "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  }
}

## Destroy review

This route will delete a review by ID. If the ID is incorrect, a `404` will be returned.

## Update review

This route will allow you to partially or fully update a review. If the ID is incorrect, a `404` will be returned.

### UPDATE /reviews/:reviewId

Create a route that responds to the following request:

```
PUT /reviews/:reviewId
```

A body like the following should be passed along with the request:

```json
{
  "score": 3,
  "content": "New content..."
}

