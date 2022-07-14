const createResourceHal = (resource, schema, page, limit) => {
   // shcema is an object with the name of the resource as key and the name of the id in the resource as value
   const resourceName = Object.keys(schema)[0]
   const identifier = schema[resourceName]
   const offset = (page - 1) * limit
   // create individual resource HAL
   const resourceMapped = resource.slice(offset, offset + +limit)

   const resourceHal = resourceMapped.map((resource) => {
      return {
         _links: {
            self: {
               href: `/api/v1/${resourceName}/${resource[identifier]}`,
            },
         },
         id: resource[identifier],
         name: resource.nombre || resource.descripcion,
      }
   })

   // create HAL collection paginated
   const _links = (() => {
      const prev = page > 1 ? `http://localhost:3000/api/v1/${resourceName}?page=${page - 1}&limit=${limit}` : null
      const next =
         page < Math.ceil(resource.length / limit)
            ? `http://localhost:3000/api/v1/${resourceName}?page=${Number(page) + 1}&limit=${limit}`
            : null
      return {
         self: {
            href: `http://localhost:3000/api/v1/${resourceName}?page=${page}&limit=${limit}`,
         },
         first: {
            href: `http://localhost:3000/api/v1/${resourceName}?page=1&limit=${limit}`,
         },
         prev,
         next,
         last: {
            href: `http://localhost:3000/api/v1/${resourceName}?page=${Math.ceil(
               resource.length / limit
            )}&limit=${limit}`,
         },
      }
   })()
   return {
      _links,
      count: Number(limit),
      total: resource.length,
      _embedded: {
         [resourceName]: resourceHal,
      },
   }
}

module.exports = {
   createResourceHal,
}
