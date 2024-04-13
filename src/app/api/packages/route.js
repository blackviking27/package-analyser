async function parsePackageData(results, packages) {

    let responseData = []
    for (let result of results) {
        if (result.status === 'fulfilled') {
            let resObject = {};
            const promiseVal = await result.value.json()
            resObject.name = promiseVal?.name;
            resObject.version = {
                prev: packages[promiseVal?.name],
                latest: promiseVal?.version
            };
            resObject.description = promiseVal.description
            resObject.links = {
                homepage: promiseVal?.homepage,
                github: promiseVal?.repository?.url?.replace("git+", "")
            }

            responseData.push(resObject)

        }
    }

    return responseData
}

export async function POST(req) {
    const packages = await req.json()

    const registryUrl = 'https://registry.npmjs.org'

    let listOfPromises = []

    for (let nodePackage in packages) {
        let promise = await fetch(`${registryUrl}/${nodePackage}/latest`)
        listOfPromises.push(promise)
    }

    const promiseResult = await Promise.allSettled(listOfPromises)

    const responseData = await parsePackageData(promiseResult, packages)

    return new Response(JSON.stringify({ data: responseData }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}