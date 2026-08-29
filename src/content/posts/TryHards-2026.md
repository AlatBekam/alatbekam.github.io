---
title: "TryHards Community Launching CTF 2026"
description: "Writeup TryHards Community Launching CTF 2026"
publishDate: 2026-08-29
tags: ["CTF", "OSINT", "Forensics", "Crypto", "Misc"]
---

## About

On Saturday, August 29th, I participated in the TryHards Community Launching CTF 2026. I complete with 2 others friends with teams called **"jangan di liat bang"**. Overall, i solve 5 Challs (3 Easy, 2 Hard).

![TryHards CTF 2026](/images/Posts/TryHards-2026/1.png)

So, enjoy my writeups

## Easy MISC : "Are ya winning, son?"

![Are ya winning, son?](/images/Posts/TryHards-2026/2.png)

### Problem

First, i see the atachment that this chall given, and saw an image like this

![Are ya winning, son?](/images/Posts/TryHards-2026/3.png)

Then, i saw the desc of the chall and got an clue

> The image data is larger than the declared dimensions, hiding content at the bottom.

Because of this, i know something hides under the image. So, for this, i need to reezise the image.

Before that, i get information from ai about this

![Are ya winning, son?](/images/Posts/TryHards-2026/4.png)

the AI say that the JPG files safe image dimension on marker **SOF0** `FF C0` or **SOF2** `FF C2`

### Payload

So for this, i use HxD to make the size of image bigger.

1. First, i search `FF C0` on HxD

![Are ya winning, son?](/images/Posts/TryHards-2026/5.png)

After search, just like ai say, the dimension of image is on the next 4-5 bytes and 6-7 bytes

where `width` is on 4-5 bytes and `height` is on 6-7 bytes

2. Change `height` to `0A 00` (2560)

_Before edit_

![Are ya winning, son?](/images/Posts/TryHards-2026/6.png)

_After edit_

![Are ya winning, son?](/images/Posts/TryHards-2026/7.png)

3. Then, save and see the image bro

![Are ya winning, son?](/images/Posts/TryHards-2026/8.png)

Yeaaahhh, finally got the flag :v

## Hard MISC : "Circa"

![Circa](/images/Posts/TryHards-2026/9.png)

### Problem

First, i see the atachment that this chall given, and saw an image like this

![Circa](/images/Posts/TryHards-2026/10.png)

This is **note.txt** say

> Try to use https://github.com/logisim-evolution/logisim-evolution/releases/latest
>
> Get that OK to 1!

Oke, then i downlad the logisim and saw this

![Circa](/images/Posts/TryHards-2026/11.png)

WAII, this things have lot of gate. Then, i have some idea to see the circ files as strings, then saw this

```bash
┌──(Hisara㉿DESKTOP-HDU1H7M)-[/mnt/c/Users/Hisara/Downloads/ctf/tryhards/Circa/circuit/circuit]
└─$ cat circuit.circ | head -n 20
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<project source="3.9.0" version="1.0">
  <lib desc="#Wiring" name="0"/>
  <lib desc="#Gates" name="1"/>
  <main name="main"/>
  <circuit name="main">
    <a name="circuit" val="main"/>
    <comp lib="0" loc="(100,100)" name="Pin">
      <a name="facing" val="east"/>
      <a name="output" val="false"/>
      <a name="label" val="b0"/>
    </comp>
    <comp lib="0" loc="(100,100)" name="Tunnel">
      <a name="facing" val="east"/>
      <a name="label" val="b0"/>
    </comp>
    <comp lib="0" loc="(100,130)" name="Pin">
      <a name="facing" val="east"/>
      <a name="output" val="false"/>
      <a name="label" val="b1"/>
```

Yes, we saw the a lot of component, and the component have name like, Pin, Tunnel, AND gate, etc.

So, i ask AI about this and then he suggest me to check Logic Gate Coordinate Mapping

![Circa](/images/Posts/TryHards-2026/12.png)

```bash
┌──(Hisara㉿DESKTOP-HDU1H7M)-[/mnt/c/Users/Hisara/Downloads/ctf/tryhards/Circa/circuit/circuit]
└─$ python a.py
Daftar komponen dalam rangkaian:
 - Pin: 201
 - Tunnel: 13900
 - Constant: 1
 - XOR Gate: 3102
 - AND Gate: 1464

Contoh struktur gerbang:
<comp lib="0" loc="(100,6130)" name="Constant">
      <a name="width" val="1" />
      <a name="value" val="0x1" />
    </comp>

<comp lib="1" loc="(400,100)" name="XOR Gate">
      <a name="size" val="30" />
      <a name="inputs" val="2" />
    </comp>

<comp lib="1" loc="(560,100)" name="AND Gate">
      <a name="size" val="30" />
      <a name="inputs" val="2" />
    </comp>
```

From this payload, we know that:

- there are 200 pin input and 1 pin output
- There is 1 output pin labeled OK which must evaluate to 1 (True).
- There are over 4,500 logic gates (XOR and AND) acting as a massive boolean verification checker.
- Brute-forcing $2^{200}$ combinations manually is impossible, so we can convert this circuit into a SAT problem and solve it using Python + Z3 Solver.

### Payload

To solve this automatically, we parse the XML netlist, connect all wires/tunnels using Disjoint-Set (Union-Find), feed the gate equations into Z3, and set the target output OK = True.

But first, we need to install `z3-solver`

```bash
pip install z3-solver
```

After that, i ask AI to make the prompt, and this things that he gave me

```python
import xml.etree.ElementTree as ET
from z3 import *
import re

tree = ET.parse('circuit.circ')
root = tree.getroot()
circuit = root.find('circuit')

loc_to_tunnel = {}
tunnels_by_label = {}
wires = []

# Collect wires and tunnels
for wire in circuit.findall('wire'):
    p1 = tuple(map(int, wire.attrib['from'].strip('()').split(',')))
    p2 = tuple(map(int, wire.attrib['to'].strip('()').split(',')))
    wires.append((p1, p2))

for comp in circuit.findall('comp'):
    c_name = comp.attrib.get('name')
    loc_str = comp.attrib.get('loc', '').strip('()')
    if not loc_str:
        continue
    loc = tuple(map(int, loc_str.split(',')))
    attrs = {a.attrib.get('name'): a.attrib.get('val') for a in comp.findall('a')}

    if c_name == 'Tunnel':
        label = attrs.get('label')
        if label:
            loc_to_tunnel[loc] = label
            tunnels_by_label.setdefault(label, []).append(loc)

# Union-Find to group connected wires and tunnels into single nets
parent = {}
def find(x):
    parent.setdefault(x, x)
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(x, y):
    px, py = find(x), find(y)
    if px != py:
        parent[px] = py

for p1, p2 in wires:
    union(f"pos_{p1[0]}_{p1[1]}", f"pos_{p2[0]}_{p2[1]}")

for label, locs in tunnels_by_label.items():
    for loc in locs:
        union(f"pos_{loc[0]}_{loc[1]}", f"tunnel_{label}")

solver = Solver()
net_vars = {}

def get_var(node):
    root_node = find(node)
    if root_node not in net_vars:
        net_vars[root_node] = Bool(f"net_{root_node}")
    return net_vars[root_node]

input_bits = {}
out_target_var = None

# Parse Pins and Constants
for comp in circuit.findall('comp'):
    c_name = comp.attrib.get('name')
    loc_str = comp.attrib.get('loc', '').strip('()')
    if not loc_str:
        continue
    loc = tuple(map(int, loc_str.split(',')))
    attrs = {a.attrib.get('name'): a.attrib.get('val') for a in comp.findall('a')}

    if c_name == 'Pin':
        is_output = attrs.get('output') == 'true'
        label = attrs.get('label', '')
        if is_output:
            out_target_var = get_var(f"pos_{loc[0]}_{loc[1]}")
        else:
            m = re.search(r'\d+', label)
            if m:
                idx = int(m.group(0))
                b_var = Bool(f"b_{idx}")
                input_bits[idx] = b_var
                solver.add(b_var == get_var(f"pos_{loc[0]}_{loc[1]}"))

    elif c_name == 'Constant':
        val = attrs.get('value', '0x1')
        is_true_val = (val not in ['0x0', '0', 'false', '0x00'])
        solver.add(get_var(f"pos_{loc[0]}_{loc[1]}") == is_true_val)

# Parse Gates and auto-detect input pin offsets
gate_comps = [c for c in circuit.findall('comp') if c.attrib.get('name') in ['XOR Gate', 'AND Gate', 'OR Gate', 'NOT Gate']]

for comp in gate_comps:
    c_name = comp.attrib.get('name')
    loc = tuple(map(int, comp.attrib.get('loc', '').strip('()').split(',')))
    attrs = {a.attrib.get('name'): a.attrib.get('val') for a in comp.findall('a')}

    gx, gy = loc
    out_var = get_var(f"pos_{gx}_{gy}")

    possible_inputs = []
    for dx in [30, 40, 50, 20]:
        for dy in [-10, 10, -20, 20, 0]:
            cand = (gx - dx, gy + dy)
            cand_key = f"pos_{cand[0]}_{cand[1]}"
            if cand in loc_to_tunnel or cand_key in parent:
                if cand not in possible_inputs:
                    possible_inputs.append(cand)

    if c_name in ['XOR Gate', 'AND Gate', 'OR Gate'] and len(possible_inputs) >= 2:
        possible_inputs.sort(key=lambda p: p[1])
        in1_v = get_var(f"pos_{possible_inputs[0][0]}_{possible_inputs[0][1]}")
        in2_v = get_var(f"pos_{possible_inputs[1][0]}_{possible_inputs[1][1]}")

        if attrs.get('negate0') == 'true': in1_v = Not(in1_v)
        if attrs.get('negate1') == 'true': in2_v = Not(in2_v)

        if c_name == 'XOR Gate':
            solver.add(out_var == Xor(in1_v, in2_v))
        elif c_name == 'AND Gate':
            solver.add(out_var == And(in1_v, in2_v))
        elif c_name == 'OR Gate':
            solver.add(out_var == Or(in1_v, in2_v))

# Force OK output to 1 (True)
if out_target_var is not None:
    solver.add(out_target_var == True)
else:
    solver.add(get_var("tunnel_OK") == True)

# Solve SAT and decode bits as MSB-first
if solver.check() == sat:
    m = solver.model()
    num_bits = len(input_bits)
    bits = [1 if is_true(m[input_bits[i]]) else 0 for i in range(num_bits)]

    msb_chars = []
    for i in range(0, num_bits, 8):
        byte_bits = bits[i:i+8]
        val = int("".join(map(str, byte_bits)), 2)
        msb_chars.append(chr(val))

    print("Flag:", "".join(msb_chars))
```

Then, Run it.

![Solver Output](/images/Posts/TryHards-2026/13.png)

### Conclusion

After all, this chall just makes us brute-force the 200 possible TRUE or FALSE combination which can make us go insane. But with Z3 Solver, we can solve it instantly and get the flag.

#### What is Z3 Solver

Z3 is an SMT (Satisfiability Modulo Theories) solver developed by Microsoft Research. It is a high-performance theorem prover that can be used to solve problems in various domains, including formal verification, constraint solving, and automated reasoning. Z3 is a powerful tool that can be used to solve problems that are too complex to solve manually, and it is widely used in both academia and industry.

## Easy OSINT : "Oversharing"

!["Oversharing"](/images/Posts/TryHards-2026/14.png)

This is an OSINT chall, where given an 2 of attachment,

- Lab
- view.jpg

### Problem

First, i saw the image

![Problem](/images/Posts/TryHards-2026/15.jpeg)

we can saw an KFC, Pizza Hut, Helens, and Seraphim Center.

For faster analysis, just send the image to AI then ask where is it lul

![AI Analysis](/images/Posts/TryHards-2026/16.png)

Because AI say that things in **Gading Serpong**, then i search KFC in Gading Serpong

![Google Maps](/images/Posts/TryHards-2026/17.png)

Voila, we found the KFC Gading Serpong, now we just need to find the exact location of the image.

Remember, they just gives us 5 attempt to guess, so i just use 2 attempt to guess. Then i realise _"OSINT is need to guess cause the coordinates must have a difference of a fraction of a comma"_. Because of that, i just remember there are 2nd attach, there is an website that the lab gave us.

![Website](/images/Posts/TryHards-2026/18.png)

Then, i use inspect mode to see this information

![Inspect Mode](/images/Posts/TryHards-2026/19.png)

```html
<!--x.com/@no1knowme123-->
```

So, just search the account on X (Twitter) and we found it

![X Account](/images/Posts/TryHards-2026/20.png)

```bash
https://x.com/no1knowme123
```

Then, theres an post with comment, where he send and maps link.

![Maps Link](/images/Posts/TryHards-2026/21.png)

```url
https://www.google.com/maps/place/BAIC+TOWER/@-6.2570675,106.6198509,19.61z/data=!4m14!1m7!3m6!1s0x2e69fd577f3c864d:0x6188cdda1c043527!2sZENTARA+Technologies!8m2!3d-6.257111!4d106.6199784!16s%2Fg%2F11mdj2_g6k!3m5!1s0x2e69fd0068d93f5b:0x2d59ee6379ff6f8d!8m2!3d-6.2572881!4d106.6198816!16s%2Fg%2F11zkcw3mws?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D
```

Voila, found the place, then we just need to create the flag from the coordinat that url gives

```bash
-6.2570675
106.6198509
```

`TryHards{-6.2570_106.6198}`

### Conclusion

This challenge is just an OSINT challenge that requires you to find the exact location of the image and create the flag from the coordinates.
