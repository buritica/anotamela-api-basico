API = Application Programming Interface

REST = Representational State Transfer (of resources)

Resources (nouns)
- User
- Company
- Weather in DF next week

Entities
- Freddy Vega
- Mejorando.la
- {
  temperature: '20c'
}

Representation
- json
  {
    name: 'freddy vega',
    height: '180cm'
  }
- xml
<name>freddy vega</name>
<height>180cm</height>
- csv
freddy vega, 180cm
- text
freddy vega
180cm

VERBS (CRUD)
POST Create
GET Read
PUT Update
DELETE Delete

POST /user
GET /user/id
PUT /user/id
DELETE /user/id