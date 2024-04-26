import { ApiResponse } from "@/redux/store"
import { FunctionalComponent } from "preact"
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from "three-spritetext";

const GraphView: FunctionalComponent<{ data?: ApiResponse }> = ({ data }) => {


    const nodes = data?.nodes.map((node, i) => ({ ...node, id: i }))!
    const links = data?.links.map((link) => {
        const source = (nodes?.find(n => n.name === link.source))?.id
        const target = (nodes?.find(n => n.name === link.target))?.id
        return { target, source }
    })!

    console.log('render graph view with:')
    console.log('nodes: ', nodes)
    console.log('links: ', links)
    return (
        <div class={`flex flex-col ${data ? 'w-full ml-5' : 'w-0 !p-0 border-0 opacity-0'} h-[100%] opacity-100 overflow-hidden transition-all duration-150`}>
            <h2 class='font-mono p-1'>Grpah View</h2>
            <div class={`relative flex flex-col gap-3 min-w-full h-full px-5 py-2 border border-1 border-primary rounded-md overflow-y-auto`}>

                {data && <ForceGraph3D
                    width={900}
                    height={870}
                    backgroundColor={`#222831`}
                    graphData={{ nodes, links }}
                    // nodeAutoColorBy="group"
                    nodeThreeObject={(node: any) => {
                        // console.log(node)
                        const sprite = new SpriteText(node.id);
                        sprite.text = node.name
                        sprite.color = '#76ABAE';
                        sprite.textHeight = 8;
                        return sprite;
                    }}

                />}

{/* {data && <ForceGraph2D
                    width={900}
                    height={870}
                    backgroundColor={`#222831`}
                    graphData={{ nodes, links }}
                    // nodeAutoColorBy="group"
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node.id;
                        const fontSize = 12/globalScale;
                        ctx.font = `${fontSize}px Sans-Serif`;
                        const textWidth = ctx.measureText(label).width;
                        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
            
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = node.color;
                        ctx.fillText(label, node.x, node.y);
            
                        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                      }}
                      nodePointerAreaPaint={(node, color, ctx) => {
                        ctx.fillStyle = color;
                        const bckgDimensions = node.__bckgDimensions;
                        bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                      }}
                    // nodeThreeObject={(node: any) => {
                    //     // console.log(node)
                    //     const sprite = new SpriteText(node.id);
                    //     sprite.text = node.name
                    //     sprite.color = '#76ABAE';
                    //     sprite.textHeight = 8;
                    //     return sprite;
                    // }}

                />} */}

            </div>
        </div>)
}

export default GraphView