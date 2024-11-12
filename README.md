# React-query Demo

Try searching for a todo and you'll see that the it takes time because its making request to the backend.

Then all these custom requests are being cached and when you again search you'll see the cached results, but the good part it react-query is still making request to the backend but instead of showing loading it is showing the cached results for the time being.

You can obviously configure it more and remove the caching by changing the `staleTime` and `caheTime`