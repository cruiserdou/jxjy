package com.xwq.common.util;

/**
 * Created by Administrator on 13-12-18.
 */

public class DBInfo {
    String url;
    String user;
    String password;

    public DBInfo() {
        url = "jdbc:postgresql://61.178.184.197:5432/jxjy";
        user = "postgres";
        password = "postgres";
    }

    public String getUrl() {
        return url;
    }

    public String getUser() {
        return user;
    }

    public String getPassword() {
        return password;
    }
}
