

export async function GET() {
    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();

    writer.write('data: Initial SSE message\n\n');

    // Simulate periodic messages
    const intervalId = setInterval(() => {
        writer.write(`data: Periodic SSE message at ${new Date().toLocaleTimeString()}\n\n`);
    }, 1000);

    // Close the connection after 15 seconds (for demonstration purposes)
    setTimeout(async () => {
        clearInterval(intervalId);
        writer.write(`data: CLOSE SSE message at ${new Date().toLocaleTimeString()}\n\n`);
        await writer.close();
    }, 20000);

    return new Response(responseStream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
        },
    });
}