import React from "react";
import { useRef, useEffect, memo } from "react";
import * as d3 from "d3";
import { FSMConfig } from "fsm-generator";

interface FSMVisualizationProps<O> {
    fsm: FSMConfig<O>;
    width?: number;
    height?: number;
}

interface Node extends d3.SimulationNodeDatum {
    id: string;
    index: number;
}

function FSMVisualizationComponent<O>({
    fsm,
    width = 800,
    height = 600,
}: FSMVisualizationProps<O>) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous content

        const nodes: Node[] = fsm.states.map(
            (state: string, index: number) => ({
                id: state,
                index,
            })
        );
        const links = fsm.transitions.map(
            (
                [source, label, target]: [string, string, string],
                index: number
            ) => ({
                source,
                target,
                label,
                id: `${source}-${target}-${index}`, // Unique ID for each link
            })
        );

        // Group links by source and target
        const linkGroups = d3.group(
            links,
            (d: (typeof links)[number]) => `${d.source}-${d.target}`
        );

        // Define arrow markers
        svg.append("defs")
            .selectAll("marker")
            .data(["end", "end-self", "initial"])
            .enter()
            .append("marker")
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", (d) => (d === "end" ? 27 : d === "initial" ? 0 : 12))
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", (d) => (d === "end-self" ? 165 : "auto"))
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#999");

        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3
                    .forceLink(links)
                    .id((d: any) => d.id)
                    .distance(100)
            )
            .force("charge", d3.forceManyBody().strength(-1000))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force(
                "x",
                d3
                    .forceX()
                    .x((d: any) => (d.index * width) / (nodes.length - 1))
                    .strength(0.5)
            )
            .force("y", d3.forceY(height / 2).strength(0.1));

        const link = svg
            .append("g")
            .selectAll("path")
            .data(links)
            .enter()
            .append("path")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("marker-end", (d: any) => {
                const group = linkGroups.get(`${d.source}-${d.target}`);
                const index = group?.indexOf(d) ?? 0;
                const total = group?.length ?? 1;
                const markerId =
                    d.source === d.target
                        ? "end-self"
                        : `end-${index}-${total}`;

                // Dynamically create a new marker for this specific link
                svg.select("defs")
                    .append("marker")
                    .attr("id", markerId)
                    .attr("viewBox", "0 -5 10 10")
                    .attr(
                        "refX",
                        d.source === d.target
                            ? 12
                            : 26 + index - (total - 1) / 2
                    )
                    .attr("refY", -2)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5")
                    .attr("fill", "#999");

                return `url(#${markerId})`;
            });

        const node = svg
            .append("g")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 20)
            .attr("fill", (d: any) =>
                fsm.acceptingStates.includes(d.id) ? "#69b3a2" : "#69a2b2"
            )
            .attr("data-testid", "fsm-state")
            .call(
                d3
                    .drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended) as any
            );

        const label = svg
            .append("g")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .text((d: any) => d.id)
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("fill", "black");

        const linkLabel = svg
            .append("g")
            .selectAll("text")
            .data(links)
            .enter()
            .append("text")
            .text((d: any) => d.label)
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("dy", -5);

        // Add initial state indicator
        const initialState = fsm.initialState;
        const initialNode = nodes.find((n: Node) => n.id === initialState);

        if (initialNode) {
            const initialStateGroup = svg
                .append("g")
                .attr("class", "initial-state");

            initialStateGroup
                .append("circle")
                .attr("r", 5)
                .attr("fill", "none")
                .attr("stroke", "#999")
                .attr("stroke-width", 2)
                .attr("data-testid", "initial-state-indicator");

            initialStateGroup
                .append("path")
                .attr("stroke", "#999")
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .attr("marker-end", "url(#initial)");
        }

        simulation.on("tick", () => {
            link.attr("d", (d: any) => {
                if (d.source === d.target) {
                    // Self-link
                    const x = d.source.x;
                    const y = d.source.y;
                    const rx = 30;
                    const ry = 20;
                    return `M${x},${y - 20} a${rx},${ry} 0 1,1 1,0`;
                } else {
                    // Regular link
                    const dx = d.target.x - d.source.x;
                    const dy = d.target.y - d.source.y;
                    const dr = Math.sqrt(dx * dx + dy * dy);
                    return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
                }
            });

            node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

            label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);

            linkLabel
                .attr("x", (d: any) => {
                    if (d.source === d.target) {
                        return d.source.x;
                    }
                    return (d.source.x + d.target.x) / 2;
                })
                .attr("y", (d: any) => {
                    if (d.source === d.target) {
                        return d.source.y - 35;
                    }
                    const group = linkGroups.get(`${d.source}-${d.target}`);
                    const index = group?.indexOf(d) ?? 0;
                    const total = group?.length ?? 1;
                    const baseY = (d.source.y + d.target.y) / 2;
                    const offset = (index - (total - 1) / 2) * 15;
                    return baseY + offset;
                });

            // Update initial state indicator position
            if (
                initialNode &&
                initialNode.x !== undefined &&
                initialNode.y !== undefined
            ) {
                const initialStateGroup = svg.select(".initial-state");
                const offsetX = 50;
                const offsetY = 0;
                initialStateGroup
                    .select("circle")
                    .attr("cx", initialNode.x - offsetX)
                    .attr("cy", initialNode.y + offsetY);
                initialStateGroup
                    .select("path")
                    .attr(
                        "d",
                        `M${initialNode.x - offsetX},${
                            initialNode.y + offsetY
                        } L${initialNode.x - 20},${initialNode.y + offsetY}`
                    );
            }
        });

        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
    }, [fsm, width, height]);

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            data-testid="fsm-visualization"
        ></svg>
    );
}

const FSMVisualization = memo(
    FSMVisualizationComponent
) as typeof FSMVisualizationComponent;

export default FSMVisualization;
