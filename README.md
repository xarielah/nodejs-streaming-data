# Streaming Data

Using NodeJS built-in HTTP module, I created a simple server serving a simple HTML file statically and on a click of a button in that page, a GET request is submitted to the data api of the server. Then we initialize a stream-reader to read the data chunks one by one, decode it, and appending it to the appropriate section in the markup.



#### What I learned

I learned from this we can actually use streams in order to ease the data transformation to the client. Right now I’m using text but it can be easily a large file, image, document, etc...

Also understanding that even the simplest request on the web are actually streams which their behavior is handled differently, is amazing.

#### What were the difficulties

I had couple of difficulties:

1. Handling the stream reader on the client side, and actually reading the data.
2. Logically how to construct such mechanism that would iterate and string, send it with each letter at a time and have it delayed so it would feel like a type-writer.

#### How did I solve them

1. Reading documentation. MDN has an extensive documentation on this, and has helped me understanding that fetch is basically fetching headers first, and then the body. Therefore we can get the response body’s reader and handle it using stream reading class.
2. I was thinking about couple of ways of doing so. I though first recursion would be a good solution for this, but I didn’t want to possibly complex such a small and simple task.
Also, using setTimeout and always write a substring and check if we have reached at the end of it but since setTimeout is a one-time thing, I had to retrigger it if string wasn’t fully transmitted.
So I went with create a stream internally that would read the TXT file from storage. Also in order so control the size of chunks transferred. I'm creating a read stream that would read the TXT file and I would pipe it to the write stream, the response basically to the client.