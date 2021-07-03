import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class JavaApplication55 {
    int[] values = {10,20,50,100,200};

    public static void main(String[] args) {
        int[] values = {10,20,50,100,200};
        int[] ammounts = {10,10,10,10,10};
        List<Integer[]> results = solutions(values, ammounts, new int[5], 180, 0);
        for (Integer[] result : results){
            System.out.println(Arrays.toString(result));
        }

    }

    public static List<Integer[]> solutions(int[] values, int[] ammounts, int[] variation, int price, int position){
        List<Integer[]> list = new ArrayList<>();
        int value = compute(values, variation);
        if (value < price){
            for (int i = position; i < values.length; i++) {
                if (ammounts[i] > variation[i]){
                    int[] newvariation = variation.clone();
                    newvariation[i]++;
                    List<Integer[]> newList = solutions(values, ammounts, newvariation, price, i);
                    if (newList != null){
                        list.addAll(newList);
                    }
                }
            }
        } else if (value == price) {
            list.add(myCopy(variation));
        }
        return list;
    }    

    public static int compute(int[] values, int[] variation){
        int ret = 0;
        for (int i = 0; i < variation.length; i++) {
            ret += values[i] * variation[i];
        }
        return ret;
    }    

    public static Integer[] myCopy(int[] ar){
        Integer[] ret = new Integer[ar.length];
        for (int i = 0; i < ar.length; i++) {
            ret[i] = ar[i];
        }
        return ret;
    }
}