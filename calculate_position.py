# encoding:utf-8
import copy
import random
import bisect #bisect_left　これで二部探索の大小検索が行える
import fractions #最小公倍数などはこっち
import math
import sys
import collections

mod = 10**9+7
sys.setrecursionlimit(mod) # 再帰回数上限はでdefault1000

d = collections.deque()
def LI(): return list(map(int, sys.stdin.readline().split()))

radius = 1.6
element_num = 5

for i in range(element_num):
    y = radius * math.cos(2 * math.pi / element_num * i)
    z = radius * math.sin(2 * math.pi / element_num * i)
    y1 = 10 * radius * math.cos(2 * math.pi / element_num * i - math.pi / element_num)
    y2 = 10 * radius * math.cos(2 * math.pi / element_num * i + math.pi / element_num)
    z1 = 10 * radius * math.sin(2 * math.pi / element_num * i - math.pi / element_num)
    z2 = 10 * radius * math.sin(2 * math.pi / element_num * i + math.pi / element_num)

    print("i:",i)
    print("position = " + str(y)[:6] + " 0.01 " + str(z)[:6])
    print("vertex-a='"+str(y1)[:6] +" 0.1 " + str(z1)[:6]+"'")
    print("vertex-b='" + str(-1 * y)[:6]+ " 0.1 " + str(-1 * z)[:6] + "'")
    print("vertex-c='"+str(y2)[:6] + " 0.1 " + str(z2)[:6] + "'")

    