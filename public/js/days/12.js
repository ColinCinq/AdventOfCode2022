/*
--- Day 12: Hill Climbing Algorithm ---
You try contacting the Elves using your handheld device, but the river you're following must be too low to get a decent signal.
You ask the device for a heightmap of the surrounding area (your puzzle input). The heightmap shows the local area from above broken into a grid; the elevation of each square of the grid is given by a single lowercase letter, where a is the lowest elevation, b is the next-lowest, and so on up to the highest elevation, z.
Also included on the heightmap are marks for your current position (S) and the location that should get the best signal (E). Your current position (S) has elevation a, and the location that should get the best signal (E) has elevation z.
You'd like to reach E, but to save energy, you should do it in as few steps as possible. During each step, you can move exactly one square up, down, left, or right. To avoid needing to get out your climbing gear, the elevation of the destination square can be at most one higher than the elevation of your current square; that is, if your current elevation is m, you could step to elevation n, but not to elevation o. (This also means that the elevation of the destination square can be much lower than the elevation of your current square.)
For example:

Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
Here, you start in the top-left corner; your goal is near the middle. You could start by moving down or right, but eventually you'll need to head toward the e at the bottom. From there, you can spiral around to the goal:

v..v<<<<
>v.vv<<^
.>vv>E^^
..v>>>^^
..>>>>>^
In the above diagram, the symbols indicate whether the path exits each square moving up (^), down (v), left (<), or right (>). The location that should get the best signal is still E, and . marks unvisited squares.
This path reaches the goal in 31 steps, the fewest possible.
What is the fewest steps required to move from your current position to the location that should get the best signal?
*/
function daily(input, output) {
    if (input.val() !== '') {
        let map = input.val().split('\n'),
            dimention = [map.length, map[0].length],
            map_graph = [],
            start = 83,
            end = 69

        for (let ii = 0; ii < dimention[0]; ii++) {
            for (let jj = 0; jj < dimention[1]; jj++) {
                map_graph.push({
                    id: dimention[1] * ii + jj,
                    value: map[ii].charCodeAt(jj),
                    neighbour: [],
                    distance: Infinity
                })
            }
        }
        map_graph.filter(point => point.value === start)[0].value = 'a'.charCodeAt(0) - 1
        map_graph.filter(point => point.value === end)[0].value = 'z'.charCodeAt(0) + 1
        start = 'a'.charCodeAt(0) - 1
        end = 'z'.charCodeAt(0) + 1

        for (let ii = 0; ii < dimention[0]; ii++) {
            for (let jj = 0; jj < dimention[1]; jj++) {
                let neighbour = [],
                    curr_point = map_graph[dimention[1] * ii + jj]
                if (ii > 0)
                    neighbour.push(map_graph[dimention[1] * (ii - 1) + jj])
                if (ii < dimention[0] - 1)
                    neighbour.push(map_graph[dimention[1] * (ii + 1) + jj])
                if (jj > 0)
                    neighbour.push(map_graph[dimention[1] * ii + jj - 1])
                if (jj < dimention[1] - 1)
                    neighbour.push(map_graph[dimention[1] * ii + jj + 1])

                neighbour = neighbour.filter(point => point.value <= curr_point.value + 1)
                curr_point.neighbour = neighbour
            }
        }

        let in_process = map_graph.filter(point => point.value === start),
            distance = 0,
            to_process = []

        while (in_process.length > 0) {
            in_process.forEach((point) => {
                point.distance = distance
                to_process.push(...point.neighbour.filter(point => point.distance > distance + 1))
            })
            distance++
            in_process = Array.from(new Set(to_process))
            to_process = []
        }

        output.val(map_graph.filter(point => point.value === end)[0].distance)
        part2(map_graph, output, dimention)
    }
}

/*
--- Part Two ---
As you walk up the hill, you suspect that the Elves will want to turn this into a hiking trail. The beginning isn't very scenic, though; perhaps you can find a better starting point.
To maximize exercise while hiking, the trail should start as low as possible: elevation a. The goal is still the square marked E. However, the trail should still be direct, taking the fewest steps to reach its goal. So, you'll need to find the shortest path from any square at elevation a to the square marked E.
Again consider the example from above:

Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
Now, there are six choices for starting position (five marked a, plus the square marked S that counts as being at elevation a). If you start at the bottom-left square, you can reach the goal most quickly:

...v<<<<
...vv<<^
...v>E^^
.>v>>>^^
>^>>>>>^
This path reaches the goal in only 29 steps, the fewest possible.
What is the fewest steps required to move starting from any square with elevation a to the location that should get the best signal?
*/

function part2(map_graph, output, dimention) {
    let end = 'z'.charCodeAt(0) + 1
    map_graph.forEach((point) => {
        point.distance = Infinity
    })

    let in_process = map_graph.filter(point => point.value === 'a'.charCodeAt(0)),
        distance = 0,
        to_process = []

    while (in_process.length > 0) {
        in_process.forEach((point) => {
            point.distance = distance
            to_process.push(...point.neighbour.filter(point => point.distance > distance + 1 && !in_process.includes(point)))
        })
        distance++
        in_process = Array.from(new Set(to_process))
        to_process = []
    }
    // let aff_map = ''
    // for (let ii = 0; ii < dimention[0]; ii++) {
    //     for (let jj = 0; jj < dimention[1]; jj++) {
    //         let curr_point = map_graph[dimention[1] * ii + jj]
    //         if (curr_point.distance < 10)
    //             aff_map += '00' + curr_point.distance + ' '
    //         else if (curr_point.distance < 100)
    //             aff_map += '0' + curr_point.distance + ' '
    //         else if (curr_point.distance === Infinity)
    //             aff_map += '    '
    //         else
    //             aff_map += curr_point.distance + ' '
    //     }
    //     aff_map += '\n'
    //     for (let jj = 0; jj < dimention[1]; jj++) {
    //         let curr_point = map_graph[dimention[1] * ii + jj]
    //         aff_map += String.fromCharCode(curr_point.value) + '   '
    //     }
    //     aff_map += '\n'
    // }
    // console.log(aff_map)

    output.val(map_graph.filter(point => point.value === end)[0].distance)
}